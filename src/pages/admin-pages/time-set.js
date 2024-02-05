//กำหนดเวลา (แอดมิน)
import "./time-set.css";
const TimeSet = () => {
  return (
    <div className="background">
      <div>
        <h1
          style={{
            flex: 1,
            borderColor: "red",
            borderWidth: 5,
          }}
          className="flex flex-col font-family mt-10 ml-10 font-bold text-xl size-30 "
        >
          เปิด/ปิด ระบบลงทะเบียน
        </h1>

        <div
          style={{
            flex: 1,
            borderColor: "green",
            borderWidth: 10,
          }}
        >
          <div class="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Default radio
            </label>
          </div>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
          <p>jjjjjjjj</p>
        </div>

        <div
          style={{
            flex: 1,
            borderColor: "blue",
            borderWidth: 10,
          }}
        >
          <div class="flex items-center">
            <input
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Checked state
            </label>
          </div>
          <p>mmmmmmm</p>
          <p>mmmmmmm</p>
          <p>mmmmmmm</p>
          <p>mmmmmmm</p>
        </div>
      </div>
    </div>
  );
};

export default TimeSet;
