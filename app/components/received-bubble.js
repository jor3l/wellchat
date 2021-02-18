import moment from "moment";
export default function ReceivedBubble({ message }) {
  return (
    <>
      <div class="flex justify-start flex-wrap">
        <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
          {message.message}
        </div>
      </div>
      <div class="flex justify-start mb-4 mt-2">
        <div class="text-sm text-gray-600 block">{message.user.name}</div>
        <div class="text-xs text-gray-300 block ml-4 align-bottom leading-5">
          {moment(message.date).fromNow()}
        </div>
      </div>
    </>
  );
}
