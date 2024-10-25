'use client';
import { BsThreeDots } from "react-icons/bs";

interface CardProps {
  imageSrc: string;
  author: string;
  name: string;
  rating: number;
  isAIGenarated: boolean;
}

const Card: React.FC<CardProps> = ({ imageSrc, author, name, rating, isAIGenarated }) => {
  return (
    <div className="p-3 border-black border-[1px] rounded-lg w-64">
      <div className="flex items-center justify-between">
        <p className="font-bold">{author}</p>
        <button type="button" className="bg-yellow-500 rounded-xl px-2 text-sm">
          <BsThreeDots className="text-xl" />
        </button>
      </div>
      <img src={imageSrc} alt={name} className="w-full h-48 rounded-2xl p-2 object-cover" />
      <div className="flex">
        <p className="text-gray-800 font-bold">{name}</p>
        {isAIGenarated && <img src="/ai-gen.jpg" alt="ai-gen" className="ml-1 w-auto h-5" />}
      </div>
      <p>{rating}/5</p>
      {isAIGenarated && <p className="text-xs font-bold text-gray-400">หมายเหตุสูตรนี้มี Ref. จาก A.I.</p>}
    </div>
  );
};

export default Card;
