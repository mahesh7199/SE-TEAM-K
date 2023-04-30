import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
// import './JSChatPage.css';

const JSChatPage = ({notification2}) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatDetail, setChatDetail] = useState([]);
  const [ind, setInd] = useState(null);
  const [message, setMessage] = useState(null);
  const [refresh, setRefresh] = useState(1);

  
  const [chats, setChats] = useState(null);
  
  const handleContactSelect = (contact) => {
    //   console.log("i i i i  i i i : ", i);
    //   setInd(i);
      setSelectedContact(contact);
    };
    

  useEffect(() => {
    const jsidd = localStorage.getItem('job_id');

    const interval = setInterval(() => {
        axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
            console.log("Response Get All Chats : ", res);
            setChats(res?.data?.chats);
            console.log("Index is false : ", ind)
            console.log("chat detail : ", chatDetail);
            
            if(ind !== null){
                
                console.log("Index is true : ", ind)
                console.log("Index 3rd val : ", chatDetail && chatDetail[0])
                setChatDetail([chatDetail && chatDetail[0], res?.data?.chats[chatDetail && chatDetail[2]]], ind);
              }
        }).catch((err) => {
            console.log("Error Get All Chats : ", err);
        })
    }, 5000);

    return () => clearInterval(interval);
    

  }, [ind])

  useEffect(() => {
    // console.log("Chat detail : ", chats);
    console.log("Chat detail : ", chatDetail);
    console.log("Chat detail : ", chatDetail[2]);
  }, [])


  function sendMessage(){
    if(message){
        console.log("Message is : ", message);
        const msgObj = {
            sender: 'SENDER',
            message: message,
            status: 'send',
        };
        axios.patch(`http://localhost:5000/api/chat/message/${selectedContact}`, msgObj).then((res) => {
            console.log("Message sent successfully : ", res);
            // setRefresh(refresh + 1);

            const arr = [chatDetail[0], res?.data?.chat]

            console.log("Chat Detail Chat Detail : ", chatDetail);
            console.log("Response chat Chat : ", res?.data?.chat);
            console.log("Response chat Chat : ", arr);

            const inputField = document.getElementById('msg-input');
            inputField.value = null;
            setMessage(null);

            // setChatDetail([res?.data?.chat?.messages]);
            setChatDetail(arr); 
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }
  } 

  

  return (
    <>
        {/* <Navbar type={1} /> */}
        <Navbar tab={4} notification2={notification2} />
        <Container fluid>
        <Row>
            <Col md={4}>
            <ListGroup className="contact-list">
                <ListGroup.Item
                action
                active={!selectedContact}
                // onClick={() => {handleContactSelect(null); }}
                >
                All Contacts
                </ListGroup.Item>
                {chats && chats?.map((item, index) => (
                    <div 
                            onClick={() => {
                                setInd(index && index);
                                console.log("SET Index : ", index)
                            }}
                    
                    >
                        <User 
                            selectedContact={selectedContact} 
                            handleContactSelect={handleContactSelect} 
                            id={item?.recruiterId}
                            cId={item?._id}
                            key={index}
                            setChatDetail={setChatDetail}
                            index={index}
                            setChats={setChats}
                            chats={chats}
                            item={item}
                            chatDetail={chatDetail}
                            setInd={setInd}
                        />
                    </div>

                ))}
            </ListGroup>
            </Col>
            <Col md={8}>
            {selectedContact ? (
                <Card className="message-card">
                    <Card.Header>Recuriter Name: {chatDetail && chatDetail[0]} </Card.Header>
                    <Card.Body className="message-body">
                        {chatDetail[1]?.messages && chatDetail[1]?.messages?.map((item, index) => (
                            <div className='w-100' style={{float: item?.sender === 'REC' ? 'right' : 'left'}} key={index}>
                                <div className={item?.sender === 'REC' ? "message-bubble incoming " : "message-bubble outgoing "}>{item?.message}</div>                            

                            </div>
                        ))}
                        {/* <div className='w-100' style={{float: 'left'}}>
                            <div className="message-bubble incoming">Hi, how are you?</div>

                        </div>
                        <div className='w-100' style={{float: 'left'}}>
                            <div className="message-bubble incoming">Hi, how are you?</div>

                        </div> */}
                        {/* <div className="message-bubble outgoing">I'm doing well, thanks!</div> */}
                    </Card.Body>
                    <Card.Footer className="message-footer">
                        <Form.Group controlId="formMessage">
                            <Form.Control type="text" defaultValue={message} id="msg-input" onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" />
                        </Form.Group>
                        <Button variant="primary" className='mt-2' type="button" onClick={sendMessage}>
                            Send
                        </Button>
                    </Card.Footer>
                </Card>
            ) : (
                <div className="select-contact-message">Select a contact to start chatting</div>
            )}
            </Col>
        </Row>
        </Container>
    </>
  );
};

const User = ({selectedContact, handleContactSelect, id, setChatDetail, item, index, chats, setChats, cId, setInd, chatDetail}) => {
    const [js, setJs] = useState(null);
    const [notification, setNotification] = useState(null);
    
    // const [chats, setChats] = useState(null);


    useEffect(() => {        
        axios.get(`http://localhost:5000/api/users/recruiter/${id}`).then((res) => {
            console.log("Get Applicant Response : ", res);
            setJs(res?.data?.jobSeeker);
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }, [])

    useEffect(() => {
        console.log("item item : : ", item)
        checkDeliveredMsg(item?.messages)
    }, [item])

    function checkDeliveredMsg (messages) {
        let count = 0;
        for(let i = 0; i < messages?.length; i++){
            if(messages[i]?.status === "delivered"){
                count = count + 1;
            }
        }
        console.log("Count : ", count);
        setNotification(count);
    }


    useEffect(() => {
        console.log("chatDetail : ", chatDetail[1]?.messages)
        setTimeout(() => {
            console.log("time out")
            if(chatDetail !== null){
                console.log("working ")
                // changeStatusOfMsg(chatDetail[1]?.messages);
                if(chatDetail[1]?.messages){    
                    console.log("Chat detail detail : test : ", chatDetail);
                    changeStatusOfMsg2(chatDetail[1]?.messages)
                }
            }
        }, 2000)
    }, [chatDetail])


    // useEffect(() => {
    //   const jsidd = localStorage.getItem('job_id');

    //   setTimeout(() => {
    //       axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
    //           console.log("Response Get All Chats : ", res);
    //           setChats(res?.data?.chats);
    //       }).catch((err) => {
    //           console.log("Error Get All Chats : ", err);
    //       });
    //   }, 6000)

    // }, [])

    const handleIndex = (i) => {
        if(i && setInd){
            setInd(i);
        }
        console.log("i : ", i);
    }


    const changeStatusOfMsg = (data) => {
        let arr = [];
        for(let i = 0; i < data?.length; i++){
            if(data[i]?.status === "delivered"){
                const obj = {
                    ...data[i],
                    status: "seen"
                }
                arr = [...arr, obj]
            } else {
                arr = [...arr, data[i]];
            }
        }
        
        console.log("Arr : ", arr);
        const chatDocument = {...item, messages: arr};
        console.log("Chat Document : ", chatDocument);
        console.log("Chat item : ", item);

        axios.patch(`http://localhost:5000/api/chat/notification/${item?._id}`, chatDocument).then((res) => {
            console.log("respose update notification status : ", res);
            setNotification(null);
        }).catch((err) => {
            console.log("Error : ", err);
        })

        return arr;
    }


    const changeStatusOfMsg2 = (data) => {
        // let arr = [];
        for(let i = 0; i < data?.length; i++){
            if(data[i]?.status === "delivered"){
                // const obj = {
                //     ...data[i],
                //     status: "read"
                // }
                const msgId = data[i]?._id;
                axios.patch(`http://localhost:5000/api/chat/${chatDetail[1]?._id}/message/${msgId}/status/`, {status: 'seen'}).then((res) => {
                    console.log("respose update notification status : ", res);
                    setNotification(null);
                }).catch((err) => {
                    console.log("Error : ", err);
                })
                // arr = [...arr, obj]
            } else {
                // arr = [...arr, data[i]];
            }
        }
        
        // console.log("Arr : ", arr);
        // const chatDocument = {...chatDetail[1], messages: arr};
        // console.log("Chat Document : ", chatDocument);
        // console.log("Chat chatDetail[1] : ", chatDetail[1]);
        
        // console.log(`${chatDetail[1]?._id}`);

        // axios.patch(`http://localhost:5000/api/chat/notification/${chatDetail[1]?._id}`, chatDocument).then((res) => {

        // return arr;
    }


    return (
        <ListGroup.Item
                action
                active={selectedContact === cId}
                type="button"
                onClick={() => {
                    // console.log("log : ", index);
                    handleIndex(index);
                    handleContactSelect(cId); 
                    setChatDetail([js?.name, chats[index], index]);
                    changeStatusOfMsg(item?.messages);
                }}
                >
                <div className='d-flex'>
                     <div style={{width: '60px'}}>
                        <img src={`http://localhost:5000/uploads/${js?.logo}`} className="chat-profile-img" />
                    </div>
                    <div style={{width: 'calc(100% - 90px)'}}>
                        {js?.companyName} 
                        <p className='mb-0 pb-0' style={{fontSize: '11px'}}><a className='company-link' href={js?.companyLink} target="_blank">Company Wesbiste</a></p>
                    </div>
                    <div style={{width: '30px', paddingTop: '3px'}}>
                        {notification > 0 && (
                            <b className='bg-danger text-white d-block' style={{borderRadius: '30px', padding: '3px 0px 3px 10px'}}>{notification}</b>
                        )}
                    </div>
                </div>
        </ListGroup.Item>
    )
}

export default JSChatPage;


