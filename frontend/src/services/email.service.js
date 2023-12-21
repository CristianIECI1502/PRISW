import axios from "./root.service";

export const sendEmail = async (email, status) => {
    try {
        const response = await axios.post('email/', { email, status });
        const { status: responseStatus } = response;
        console.log(response); // Log the data to see what the server is returning
        if (responseStatus === 200) {
            return { state: 'Success' };
        } else {
            console.error('Server did not send the email');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};