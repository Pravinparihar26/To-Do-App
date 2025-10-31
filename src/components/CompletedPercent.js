function CompletedPercent({nightMode, percentage}) {
    return (
        <div
        className="w-28 h-28 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#22c55e ${percentage * 3.6}deg,  ${nightMode ? "#27272a" : "#e5e7eb"} ${percentage * 3.6}deg)`,
        }}
      >
        <div className="absolute w-24 h-24 bg-white dark:bg-gray-700 rounded-full flex flex-col items-center justify-center text-gray-700 dark:text-white">
          <p className="text-xl font-bold">{percentage}%</p>
          <p className="text-xs font-medium">Completed</p>
        </div>
      </div>
    )
}

export default CompletedPercent;