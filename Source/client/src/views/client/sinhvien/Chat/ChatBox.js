import "./ChatBox.scss"
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from "react-router-dom";
import { useState } from "react";
const ChatBox = () => {

    const [hiddenn, SetHiddenn] = useState(true)
    const onChangleHidden = () => {
        SetHiddenn(!hiddenn)
    }

    const [inputMessage, SetInputMessage] = useState('')

    const onChangeInput = (event) => {
        let result = event.target.value;
        SetInputMessage(result);
    }
    const [message, SetMessage] = useState([])
    const [message_robot, SetMessage_Robot] = useState(["Hi,there ✌🏻 <br /> How can I help you today?", "Chúng tôi có thể giúp gì được cho bạn?", "Xin chào! Bạn muốn shop tư vấn sản phẩm nào ạ?"])

    const sendMessage = (content) => {
        let result = message;
        content !== '' ?
            result = [...result, content] : result = result
        SetMessage(result);

        return
    }
    return (
        <div className={hiddenn ? "content-chatbox" : "content-chatbox show-chatbox"} >
            <button className="chatbot-toggler" onClick={() => onChangleHidden()}>
                <ModeCommentOutlinedIcon className="icon icon-comment" />
                <CloseOutlinedIcon className="icon icon-close" />
            </button>
            <div className="chatbot">
                <iframe
                    allow="microphone;"
                    width="440"
                    height="540"
                    src="https://console.dialogflow.com/api-client/demo/embedded/70ce2c3a-8f60-43f2-ab60-a0be4f03d47d">
                </iframe>
                {/* <header>
                    <h2>Chat    </h2>
                    <CloseOutlinedIcon className="icon icon-close" />
                </header>
                <ul className="chatbox">
                    <li className="chat incoming">
                        <SmartToyOutlinedIcon className="icon-robot" />
                        <p>Hi,there ✌🏻 <br /> How can I help you today? </p>
                    </li>
                    <li className="chat outgoing">
                        <p>How to fix all the bugs bro?</p>
                    </li>
                    <li className="chat incoming">
                        <SmartToyOutlinedIcon className="icon-robot" />
                        <p>I don't know 😭😭😭 <br /> Good luck to you </p>
                    </li>
                    <li className="chat outgoing">
                        <p>...</p>
                    </li>
                    <li className="chat incoming">
                        <SmartToyOutlinedIcon className="icon-robot" />
                        <p>Hi,there ✌🏻 <br /> How can I help you today? </p>
                    </li>
                    <li className="chat outgoing">
                        <p>Tôi cần bạn trả lời giúp tôi câu hỏi này.</p>
                    </li>
                    <li className="chat incoming">
                        <SmartToyOutlinedIcon className="icon-robot" />
                        <p>Hi,there ✌🏻 <br /> How can I help you today? </p>
                    </li>
                    <li className="chat outgoing">
                        <p>Tôi cần bạn trả lời giúp tôi câu hỏi này.</p>
                    </li>

                </ul>
                <div className="chat-input">
                    <textarea placeholder="Enter a message..." value={inputMessage} onChange={(event) => onChangeInput(event)} required></textarea>
                    <div className="send" onClick={() => sendMessage(inputMessage)} >
                        <SendOutlinedIcon className="icon-send" />
                    </div>

                </div> */}
            </div>


        </div>
    )
}

export default ChatBox


