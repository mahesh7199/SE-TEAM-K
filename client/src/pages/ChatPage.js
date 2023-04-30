// import React, { useState } from 'react';
// import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

// const ChatPage = () => {
//   const [selectedContact, setSelectedContact] = useState(null);

//   const handleContactSelect = (contact) => {
//     setSelectedContact(contact);
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col md={4}>
//           <ListGroup>
//             <ListGroup.Item
//               action
//               active={!selectedContact}
//               onClick={() => handleContactSelect(null)}
//             >
//               All Contacts
//             </ListGroup.Item>
//             <ListGroup.Item
//               action
//               active={selectedContact === 'John'}
//               onClick={() => handleContactSelect('John')}
//             >
//               John
//             </ListGroup.Item>
//             <ListGroup.Item
//               action
//               active={selectedContact === 'Jane'}
//               onClick={() => handleContactSelect('Jane')}
//             >
//               Jane
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={8}>
//           {selectedContact ? (
//             <div>Messages with {selectedContact}</div>
//           ) : (
//             <div>Select a contact to start chatting</div>
//           )}
//           <Form>
//             <Form.Group controlId="formMessage">
//               <Form.Control type="text" placeholder="Type your message here" />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Send
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ChatPage;






















import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Container, Row, Col, ListGroup, Card, Form, Button } from 'react-bootstrap';
import Navbar from '../components/common/Navbar';
// import './ChatPage.css';

const ChatPage = ({notification}) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatDetail, setChatDetail] = useState([]);
  const [ind, setInd] = useState(null);
  const [message, setMessage] = useState(null);
  const [refresh, setRefresh] = useState(1);

  
  const [chats, setChats] = useState(null);
  
  const handleContactSelect = (contact) => {
      setSelectedContact(contact);
    };
    
    //   const latestMessageRef = useRef(null);

  // This useEffect will be called after the component renders
//   useEffect(() => {
//     // Scroll to the latest message
//     latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
//   }, []);

  useEffect(() => {
    const jsidd = localStorage.getItem('rid');

    // axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
    //     console.log("Response Get All Chats : ", res);
    //     setChats(res?.data?.chats);
    // }).catch((err) => {
    //     console.log("Error Get All Chats : ", err);
    // })

    const interval = setInterval(() => {
        axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
          console.log("Response Get All Chats : ", res);
          setChats(res?.data?.chats);
        //   console.log("Index is false : ", ind)
          if(ind !== null){
            // console.log("Index is true : ", ind)
            setChatDetail([chatDetail && chatDetail[0], res?.data?.chats[ind]]);
          }
        }).catch((err) => {
          console.log("Error Get All Chats : ", err);
        });
    }, 5000);

    return () => clearInterval(interval);

  }, [ind])

  useEffect(() => {
    // console.log("Chat detail : ", chats);
    console.log("Chat detail : ", chatDetail);
  }, [])

  
  function sendMessage(){
      if(message){
          console.log("Message is : ", message);
          const msgObj = {
              sender: 'REC',
              message: message,
              status: 'delivered',
            };
        axios.patch(`http://localhost:5000/api/chat/message/${selectedContact}`, msgObj).then((res) => {
            console.log("Message sent successfully : ", res);
            // setRefresh(refresh + 1);

            const arr = [chatDetail[0], res?.data?.chat]
            
            console.log("Chat Detail Chat Detail : ", chatDetail);
            console.log("Response chat Chat : ", res?.data?.chat);
            console.log("Response chat Chat : ", arr);
            
            // setChatDetail([res?.data?.chat?.messages]);
            const inputField = document.getElementById('msg-input');
            inputField.value = null;
            setMessage(null);
            setChatDetail(arr); 
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }
  } 

  

  return (
    <>
        <Navbar type={1} tab={10} notification={notification} />
        <Container fluid>
        <Row>
            <Col md={4}>
            <ListGroup className="contact-list">
                <ListGroup.Item
                action
                active={!selectedContact}
                onClick={() => handleContactSelect(null)}
                >
                All Contacts
                </ListGroup.Item>
                {chats && chats?.map((item, index) => (
                    <User 
                        selectedContact={selectedContact} 
                        handleContactSelect={handleContactSelect} 
                        id={item?.applicantId}
                        cId={item?._id}
                        key={index}
                        setChatDetail={setChatDetail}
                        index={index}
                        setChats={setChats}
                        chats={chats}
                        setInd={setInd}
                        item={item}
                        chatDetail={chatDetail}
                    />

                ))}
            </ListGroup>
            </Col>
            <Col md={8}>
            {selectedContact ? (
                <Card className="message-card">
                    <Card.Header>{chatDetail && chatDetail[0]} </Card.Header>
                    <Card.Body className="message-body">
                        {chatDetail[1]?.messages && chatDetail[1]?.messages?.map((item, index) => (
                            <div className='w-100' style={{float: item?.sender === 'REC' ? 'right' : 'left'}} key={index}>
                                <div className={item?.sender === 'REC' ? "message-bubble outgoing" : "message-bubble incoming"}>{item?.message}</div>                            

                            </div>
                        ))}
                    </Card.Body>
                    <Card.Footer className="message-footer">
                        <Form.Group controlId="formMessage">
                            <Form.Control id="msg-input" type="text" defaultValue={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" />
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

const User = ({selectedContact, handleContactSelect, id, setChatDetail, index, chats, setChats, cId, setInd, item, chatDetail}) => {
    const [js, setJs] = useState(null);

    const [notification, setNotification] = useState(null);
    
    // const [chats, setChats] = useState(null);


    useEffect(() => {        
        axios.get(`http://localhost:5000/api/users/applicant/${id}`).then((res) => {
            console.log("Get Applicant Response : ", res);
            setJs(res?.data?.jobSeeker);
        }).catch((err) => {
            console.log("Error : ", err);
        })
    }, [])


    useEffect(() => {
        // console.log("item item : : ", item)
        checkDeliveredMsg(item?.messages)
    }, [item])

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
        }, 2400)
    }, [chatDetail])

    function checkDeliveredMsg (messages) {
        let count = 0;
        for(let i = 0; i < messages?.length; i++){
            if(messages[i]?.status === "send"){
                count = count + 1;
            }
        }
        console.log("Count : ", count);
        setNotification(count);
    }


    // useEffect(() => {
    //   const jsidd = localStorage.getItem('rid');

    // //   setTimeout(() => {
    //       axios.get(`http://localhost:5000/api/all-chats/${jsidd}`).then((res) => {
    //           console.log("Response Get All Chats : ", res);
    //           setChats(res?.data?.chats);
    //       }).catch((err) => {
    //           console.log("Error Get All Chats : ", err);
    //       });
    // //   }, 6000)

    // }, [])

    const changeStatusOfMsg = (data) => {
        let arr = [];
        for(let i = 0; i < data?.length; i++){
            if(data[i]?.status === "send"){
                const obj = {
                    ...data[i],
                    status: "read"
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
            console.log("Notification Error : ", err);
        })

        return arr;
    }

    const changeStatusOfMsg2 = (data) => {
        // let arr = [];
        for(let i = 0; i < data?.length; i++){
            if(data[i]?.status === "send"){
                // const obj = {
                //     ...data[i],
                //     status: "read"
                // }
                const msgId = data[i]?._id;
                axios.patch(`http://localhost:5000/api/chat/${chatDetail[1]?._id}/message/${msgId}/status/`, {status: 'read'}).then((res) => {
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
                onClick={() => {
                    console.log("log : ", index);
                    handleContactSelect(cId); 
                    setChatDetail([js?.name, chats[index]]);
                    setInd(index);
                    changeStatusOfMsg(item?.messages);
                }}
                >
                
                <div className='d-flex'>
                    <div style={{width: '60px'}}>
                        <img src={`http://localhost:5000/uploads/${js?.profilePic}`} className="chat-profile-img" />
                    </div>
                    <div style={{width: 'calc(100% - 90px)'}}>
                        {js?.name} 
                        <p className='mb-0 pb-0' style={{fontSize: '11px'}}>{js?.qualifications}</p>
                    </div>
                    <div style={{width: '30px', paddingTop: '3px'}}>
                        {notification > 0 && (
                            <b className='bg-danger text-white d-block' style={{borderRadius: '30px', padding: '3px 0px 3px 10px'}}>{ notification}</b>
                        )}
                    </div>
                </div>

        </ListGroup.Item>
    )
}

export default ChatPage;


