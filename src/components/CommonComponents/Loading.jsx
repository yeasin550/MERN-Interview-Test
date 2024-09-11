/* eslint-disable react/prop-types */
import c from "classnames";
// className
const Loading = ({ className }) => {

    return (
        <div className="flex justify-center">
            <div className={c("border-4 rounded-full border-gray-100 border-t-indigo-600 animate-spin w-6 h-6", className)} />
        </div>
    );
};

export default Loading;