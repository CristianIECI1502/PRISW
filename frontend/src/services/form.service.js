import axios from "./root.service";

export const getForms = async () => {
    try {
        const response = await axios.get('forms/');
        const { status, data } = response;
        console.log(data); // Log the data to see what the server is returning
        if (status === 200 && Array.isArray(data.data)) {
            return { state: 'Success', data: data.data };
        } else {
            console.error('Server did not return an array');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};

export const getFormById = async (id) => {
    try {
        const response = await axios.get(`forms/${id}`);
        const { status, data } = response;
        if (status === 200) {
            console.log(data);
            return { state: 'Success', data: data.data };
        } else {
            console.error('Server did not return the expected data');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};

export const deleteForm = async (id) => {
    try {
        const response = await axios.delete(`forms/${id}`);
        const { status } = response;
        if (status === 200) {
            return { state: 'Success' };
        } else {
            console.error('Server did not return the expected data');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};

export const editForm = async (id, formData) => {
    try {
        console.log(formData);
        const response = await axios.put(`forms/${id}`, formData);
        const { status, data } = response;
        if (status === 200) {
            console.log(data);
            return { state: 'Success', data: data.data };
        } else {
            console.error('Server did not return the expected data');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error.response.data); // Log the server's response
        return { state: 'Error' };
    }
};

export const createForm = async (formData) => {
    try {
        const response = await axios.post('forms/', formData);
        const { status, data } = response;
        if (status === 200) {
            console.log(data);
            return { state: 'Success', data: data.data };
        } else {
            console.error('Server did not return the expected data');
            return { state: 'Error' };
        }
    } catch (error) {
        console.error(error);
        return { state: 'Error' };
    }
};