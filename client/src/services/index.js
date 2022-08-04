import axios from "axios";

const getCalls = async () => {
    try {
        return await axios({
            url: 'something',
            method: 'get'
        });
    } catch (err) {
        console.log(err);
    }
};

export {
    getCalls
};
