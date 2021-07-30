import React, { useEffect , useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getMessagesConversation} from '../../stores/user/user.actions';
import "./historyMessages.css";

const HistoryMessages =  ({usernameFrom,idFrom, idTo,username}) => {
  
  const [messages, setMessages] = useState([])
  const dispatch = useDispatch();
  useEffect( () => {
      dispatch(getMessagesConversation(idFrom,idTo))
   }, [dispatch, idFrom,idTo ]) 
  const conversation = useSelector(state => state.userReducers)
  const conver = conversation.conversation;

    
  const orden = conver.sort(function(a, b) {
        return a.id - b.id;
  })
  useEffect( () => {
    setMessages(orden)
 }, [orden])
    
    return (
        <div>
          <div className="messagesTit"><h1>History messages</h1></div>
          {conver.length === 0
            ?
             (
              <div>
              
              </div>
          ):(
          <div className="messagesTable">
          <table className="tableBox">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="userCol"
                >
                  FROM
                </th>
                <th
                  scope="col"
                >
                  MESSAGE
                </th>
                
              </tr>
            </thead>

                      
              <tbody>
              {orden && orden.length > 0 && messages.length > 0? (
                  orden.map((m) => ( 
                      
                    <tr key={m.id}>
                      <td className="userCol">
                        <div >
                          <div>
                            <p>
                            {m.from === idFrom ? usernameFrom : username }
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>
                        {m.data}
                        </p>
                      </td>
                      </tr>
                        
                  ))): (
                  <tr>
                       <td colSpan={2}>No Messages</td>
                   </tr>
               )
               
              }
                  </tbody>
          </table>
        </div>
      )}
          
        </div>
    )
}

export default HistoryMessages;