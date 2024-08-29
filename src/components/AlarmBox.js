import React from 'react'
import Switch from './molecules/Switch';

const AlarmBox = ({time, day}) => {
  return (
    <div className=" bg-[#4244ED] rounded-[20px] py-[20px] px-[16px] ">
      <div className="flex justify-between bg-[url('/public/background_alarm.png')] ">
        <div>
          <h1 className='font-medium text-[20px] text-white '>Bangun Pagi Weekdays</h1>
          <h1 className='text-[36px] font-light text-white  '>{time}</h1>
          <div className="grid grid-cols-5 gap-2 ">
            <p className='text-[20px] font-medium text-white '>{day}</p>
          </div>
        </div>
        {/* <Switch /> */}
      </div>
    </div>
  );
}

export default AlarmBox
