'use client';

interface CardProps {
  imageSrc: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, description }) => {
  return (
    <div className="bg-yellow-400 rounded-lg shadow-lg p-10 max-w-sm">
      <img src={imageSrc} alt={description} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="mt-4">
        <p className="text-gray-800 text-center text-lg font-bold">{description}</p>
      </div>
    </div>
  );
};

export default Card;
