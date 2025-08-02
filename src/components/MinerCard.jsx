export default function MinerCard({ title, value, unit, bgColor, textColor }) {
  return (
    <div className={`p-4 rounded-lg shadow ${bgColor}`}>
      <h2 className="text-center font-semibold">{title}</h2>
      <p className={`text-center text-2xl font-bold ${textColor}`}>
        {value} {unit}
      </p>
    </div>
  )
}
