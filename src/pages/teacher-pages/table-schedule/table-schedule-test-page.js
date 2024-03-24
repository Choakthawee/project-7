import axios from "axios";
import { useEffect, useState } from "react";
import "./tablesim.css";
export default function TableSchedule() {
    const [loading, setLoading] = useState(true);
    const [isCheck, setIsCheck] = useState(false);
    const [periodDate, setPeriodDate] = useState(''); // ต้องกำหนดค่าให้ period_date ใน Vue.js ด้วยนะครับ
    const [courses, setCourses] = useState([
        {day_w:"MON",subject_code:"0123213",time_from:"12:00",time_to:"15:00",section_code:"800"}
    ]);
    // สร้างฟังก์ชัน getColorByDate และ mappedCourses ตามที่ต้องการ

    const headers = [
        'Day/Time',
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
    ];

    const orderedDate = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    useEffect(() => {
        getSchedule();
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
    const timeToCol = (timeString) => {
        const time = timeString?.split(':') || [];
        if (time.length !== 2) {
            return 0;
        }
        const remainder = +time[1] / 60;
        return (+time[0] + remainder) * 2 - 13;
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

    const logout = () => {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('stdId');
        // Navigate to login page
    };
    const download = () => {

    }
    return (
        <div>
            {loading && <div>Loading...</div>}
            <div className="mx-auto container pt-7 pb-10 bg-black ">
                <div>
                    <h1 class="text-4xl font-bold mb-2 md:mb-0 mr-5 inline-block align-top dark:text-white">
                        Schedule
                        <p class="md:text-xl text-sm font-normal text-gray-600 dark:text-white">
                            Period:
                        </p>
                    </h1>
                </div>
                <div className="overflow-x-auto border mx-1 rounded-lg" id="printcontent">
                    <div className="overflow-x-hidden table-w " id="table">
                        <div className="grid grid-cols-[26]">
                            {headers.map((header, index) => (
                                <div key={`header-${index}`} className="border py-1 pl-1  dark:text-white">
                                    {header}
                                </div>
                            ))}
                        </div>
                        {orderedDate.map((date, dateIndex) => (
                            <div key={`date-${dateIndex}`} className="grid grid-cols-26 min-h-16 md:min-h-24 border dark:border-gray-700">
                                <div className={`p-1 md:p-3 col-span-2 border-r-2 dark:border-gray-700 ${getColorByDate(date)}`}>
                                    <span className="font-bold dark:text-gray-900">{date}</span>
                                </div>
                                {courses.map((course, courseIndex) => {
                                    if (course.day_w.trim() === date) {
                                        return (
                                            <div key={`course-${courseIndex}`} className={`border p-2 md:px-3 md:py-2 rounded text-xs md:text-sm bg-opacity-60 flex flex-col justify-between hover:bg-opacity-70 overflow-hidden cursor-pointer dark:bg-opacity-100 dark:border-gray-700 ${getColorByDate(date)} col-start-${timeToCol(course.time_from)} col-end-${timeToCol(course.time_to)}`}>
                                                <p className="flex flex-wrap justify-between mb-2">
                                                    <span>{course.subject_code}</span>
                                                    <span>[{course.time_from} - {course.time_to}]</span>
                                                </p>
                                                <p>{isCheck ? course.subject_name_en : course.subject_name_th}</p>
                                                <div className="flex justify-between text-gray-700 text-xs">
                                                    <div>
                                                        <span>{isCheck ? `ROOM: ${course.room_name_en}` : `ห้อง: ${course.room_name_th}`}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span>{isCheck ? `SEC${course.section_code} ${course.section_type_en}` : `หมู่${course.section_code} ${course.section_type_th}`}</span>
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