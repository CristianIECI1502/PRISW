import axios from "./root.service";

export const getBeneficios = async (userId = '6539cf25ec3418d30d60d02f') => {
    try {
        const response = await axios.get(`users/${userId}/beneficio/`);
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

export const getBeneficioById = async (id) => {
    try {
        const response = await axios.get(`/users/6539cf25ec3418d30d60d02f/beneficio/${id}`);
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

export const deleteBeneficio = async (id) => {
    try {
        const response = await axios.delete(`/users/6539cf25ec3418d30d60d02f/beneficio/${id}`);
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

export const editBeneficio = async (id, beneficioData) => {
    try {
        console.log(beneficioData);
        const response = await axios.put(`/users/6539cf25ec3418d30d60d02f/beneficio/${id}`, beneficioData);
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

export const createBeneficio = async (beneficioData) => {
    try {
        const response = await axios.post('/users/6539cf25ec3418d30d60d02f/beneficio/', beneficioData);
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
