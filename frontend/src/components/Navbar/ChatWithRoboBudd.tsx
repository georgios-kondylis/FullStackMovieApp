import React, { useState, useEffect, useRef } from 'react'
import { useGlobalProps } from '../exports'
import { getMovieAiReply } from '../../services/aiResponse';


type Message = {
  sender: 'user' | 'robo';
  text: string;
}

const ChatWithRoboBudd = ({setRoboBuddyIsOpen} : any) => {
  
  const { customStyles, user, selectedProfile } = useGlobalProps()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [chatStarted, setChatStarted] = useState<boolean>(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [aiState, setAiState] = useState<any | null>(null)

  // Ref for scrolling
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, chatLoading])

  const sendMessage = (): void => {
    if (!input.trim()) return   
    if (!chatStarted) setChatStarted(true)

    setMessages(prev => [...prev, { sender: 'user', text: input }])
    setInput("")
    setChatLoading(true);

    setTimeout(() => {
      const { reply: text, newState } = getMovieAiReply(input, selectedProfile?.name || user?.name || "Guest")
      setMessages(prev => [...prev, { sender: 'robo', text }])
      setAiState(newState)
      setChatLoading(false)
    }, 1000)

  }

  return (
    <div className={`absolute right-[-5px] max-md:right-[-35px] max-sm:right-[-45px] top-[55px] max-md:top-[45px] ${customStyles?.mainBgDark} h-[500px] sm:min-w-[400px] w-[320px] border border-[#ffffff27] rounded-[10px] flex flex-col justify-between`}>
     
      <div className={`text-[#ffffffca] hover:text-[#ffffff] text-[20px] flex justify-end p-2`}>
        <i className="fa-solid fa-circle-xmark | cursor-pointer hover:scale-[1.1] transition1" onClick={() => setRoboBuddyIsOpen(false)}/>
      </div>

      {/* Intro message */}
      {!chatStarted && (
        <div id='HELLO' className="w-full flex items-center justify-between p-3"> 
          <p className="max-w-[220px] max-sm:max-w-[190px] rounded-[10px] p-2 bg-white text-black relative max-sm:text-[12px]"> 
            Hi, I’m <span className="font-bold">RoboBuddy</span><br /> 
            Your friendly movie nerd here to chat about films, share fun facts, and recommend hidden gems based on your taste!
            <span className="absolute -right-4 top-7 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[20px] border-l-white"></span>
          </p> 
          <img src="/robo-buddy/roboBody.png" className="w-[120px] max-sm:w-[90px]" alt="RoboBuddy" /> 
        </div>
      )}

      {/* Chat messages */}
      <div id="Chat" className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'robo' && (
              <img src="/robo-buddy/robotFace.png" alt="RoboBuddy"
               className="w-8 h-8 mr-2 transform -scale-x-100" 
              />
            )}
           
            <p className={`p-2 rounded-lg max-w-[220px]
              ${ msg.sender === 'user' ? 'bg-[#131e39] text-white' : 'bg-white text-black' }`} >
              {msg.text}
            </p>
            {msg.sender === 'user' && (
              <img src={user && selectedProfile ? selectedProfile.profileImage : '/profileAvatars/guestAvatar.png'} alt="User profile" className="w-8 h-8 ml-2 rounded-full object-cover" />
            )}            
          </div>
        ))}

        {/* Typing animation */}
        {chatLoading && (
          <div className="flex items-end">
            <img src="/robo-buddy/robotFace.png" alt="RoboBuddy" className="w-8 h-8 mr-2 transform -scale-x-100" />
            <div className="p-2 rounded-lg bg-[#ffffff44] flex space-x-1 max-w-[60px]">
              <span className="dot animate-bounce"></span>
              <span className="dot animate-bounce animation-delay-200"></span>
              <span className="dot animate-bounce animation-delay-400"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>

      {/* Input area */}
      <div className="flex items-center p-2 text-white">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 rounded-lg bg-[#131e39] focus:outline-none"
        />
        <button onClick={sendMessage} className={`ml-2 px-4 py-2 ${customStyles?.btnColor} rounded-lg`} >
          Send
        </button>
      </div>

    </div>
  )
}

export default ChatWithRoboBudd
