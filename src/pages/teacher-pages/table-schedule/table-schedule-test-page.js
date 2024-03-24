import axios from "axios";
import { useEffect, useState } from "react";
import "./tablesim.css";
import { apiurl } from "../../../config";
export default function TableSchedule() {
    const [loading, setLoading] = useState(true);
    const [isCheck, setIsCheck] = useState(false);
    const [periodDate, setPeriodDate] = useState(''); // ต้องกำหนดค่าให้ period_date ใน Vue.js ด้วยนะครับ
    const [courses, setCourses] = useState([]);
    const userID = localStorage.getItem("userid")
    const headers = [
        'Day/Time',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
    ];
    const orderedDate = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await axios.get(apiurl + "/api/teacher/schedule_single/" + userID);
                const data = response.data;
                console.log(data);
                setCourses(data);

            } catch (error) {
            }
        };

        fetchScheduleData();
    }, []);
    const getSchedule = () => {
        setLoading(true);
        axios
            .get('/getSchedule', {
                params: {
                    stdId: localStorage.getItem('stdId'),
                },
            })
            .then((response) => {
                const { data } = response;
                setCourses(data.course);
                setPeriodDate(data.peroid_date);
            })
            .catch((error) => {
                console.log(error);
                // Handle error here
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const timeToCol = (timeString, d) => {
        const time = timeString?.split(':') || [];
        if (time.length < 2) {
            return 0;
        }

        const remainder = +time[1] / 60;
        console.log((+time[0] + remainder) * 6 - 29);
        const timer = (+time[0] + remainder) * 6 - 29;
        return timer;
    };

    const getColorByDate = (date) => {
        const color = {
            MON: 'bg-yellow-200',
            TUE: 'bg-pink-400',
            WED: 'bg-green-400',
            THU: 'bg-yellow-400',
            FRI: 'bg-blue-400',
            SAT: 'bg-purple-400',
            SUN: 'bg-red-400',
        };
        return color[date];
    };
    return (
        <div>
            <div className=" bg-white overflow-x-auto">
                <div className=" rounded-lg min-w-[1200px]">
                    <div className="grid">
                        <div className="grid custom-grid-table  ">
                            {headers.map((header, index) => (
                                <div key={`header-${index}`} className=" border pl-0 py-2 col-span-6  text-black">
                                    {header}
                                </div>
                            ))}
                        </div>
                        {orderedDate.map((date, dateIndex) => (
                            <div key={`date-${dateIndex}`} className="grid custom-grid-table ">
                                <div className={`col-span-6 min-h-16 p-2 ${getColorByDate(date)}`}>
                                    {date}
                                </div>
                                {courses.map((course, courseIndex) => {
                                    if (course.day_id === dateIndex + 1) {
                                        return (
                                            <div key={`course-${courseIndex}`} className={`border p-2 md:px-3 md:py-2 rounded text-xs md:text-sm bg-opacity-60 flex flex-col justify-between hover:bg-opacity-70 overflow-hidden cursor-pointer dark:bg-opacity-100 dark:border-gray-700 ${getColorByDate(date)}`}
                                                style={{ gridColumnStart: timeToCol(course.st), gridColumnEnd: timeToCol(course.et) }}
                                            >
                                                <p className="flex flex-wrap justify-between mb-2">
                                                    <span>{course.SUBJECT}</span>
                                                    <span>[{course.st?.slice(0, 5)} - {course.et?.slice(0, 5)}]</span>
                                                </p>
                                                <p>{isCheck ? course.subject_name_en : course.subject_name_th}</p>
                                                <div className="flex justify-between text-gray-700 text-xs">
                                                    <div>

                                                    </div>
                                                    <div className="text-right">
                                                        <span>{`${course.id_subject}-${course.ySubject}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </div>
                    <span className="hidden" id="create-by">
                        created by <a href="https://ku-table.vercel.app" className="text-blue-600 underline">https://ku-table.vercel.app</a>
                    </span>
                </div>
                {/* Render unit component */}

            </div>
        </div>
    );
}