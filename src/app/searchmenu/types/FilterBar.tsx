export type FilterBarProps = {
  selectedTools: string[];
  setSelectedTools: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSource: string[];
  setSelectedSource: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
};
export const tools: string[] = [
  "ทั้งหมด",
  "เตาอบ",
  "เครื่องปั่น",
  "ไมโครเวฟ",
  "กระทะไฟฟ้า",
  "หม้อนึ่ง",
  "หม้อทอดไร้น้ำมัน",
  "หม้อหุงข้าว",
  "หม้ออบลมร้อน",
];

export const sources: string[] = ["ทั้งหมด", "AI", "ผู้ใช้งาน"];