import moment from "moment";
export default function SentBubble({ message }) {
  return (
    <>
      <div class="flex justify-end flex-wrap">
        <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
          {message.message}
        </div>
      </div>
      <div class="text-xs text-gray-300 block mt-2 mb-4 block text-right">
        {moment(message.date).fromNow()}
      </div>
    </>
  );
}
