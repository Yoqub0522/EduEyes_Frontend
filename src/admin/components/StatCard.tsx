interface IProps {
  title: string;
  value: number;
}
const StatCard = ({ title, value }: IProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};
export default StatCard;