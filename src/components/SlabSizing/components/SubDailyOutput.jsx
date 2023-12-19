function SubDailyOutput({ show }) {
  let showing = {};

  if (show == 0) {
    showing = { head: "Last Hour", pass: 10, fail: 4 };
  } else if (show == 1) {
    showing = { head: "Shift", pass: 5, fail: 3 };
  } else if (show == 2) {
    showing = { head: "Today", pass: 13, fail: 7 };
  } else if (show == 3) {
    showing = { head: "Yesterday", pass: 7, fail: 2 };
  }

  return (
    <div className="w-full  h-full bg-[#FAFAFA] rounded-lg">
      <div className="bg-[#F2F5FA] text-[14px] text-[#79767D] p-1">
        {showing.head}
      </div>
      <div className="flex gap-2 justify-between p-2">
        <div className="text-[#929292] text-[13px]">Passed </div>
        <div className="text-[#69B24A] text-[14px]">{showing.pass}</div>
      </div>
      <div className="flex gap-2 justify-between p-2">
        <div className="text-[#929292] text-[13px]">Rejected</div>
        <div className="text-[#DC362E] text-[14px]">{showing.fail}</div>
      </div>
    </div>
  );
}

export default SubDailyOutput;
