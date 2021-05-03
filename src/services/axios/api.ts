import axios from 'axios'
import useSWR from 'swr'

export const api = axios.create({
    baseURL: ' http://localhost:8080/',
});

export async function GetAll<Data = any>(url: string) {
        const response = await api.get(`${url}`)

        const data = response.data;

        return data;
};

export function GetAllExams<Data = any>(url: any, values: any) {
    const { data, error } = useSWR<Data>(url, async url => {
        const response = await api.get(`${url}`, {params: {
            healthcareinstitution: values
        }})
        
        const data = response.data;

        return data;
    }, { revalidateOnFocus: true, revalidateOnMount: true }  );
    return { data, error };
};

export async function put<Data = unknown>(id: string, values: any, url: string, type: string) {
    await api.put<Data>(`/${url}/${id}`, values).then(() => {
        alert(`Congratulations! ${type} ${values.name} was updated!`);
    }).catch((err) => {
        if (err.response.data.status == 400) {
            alert(err.response.data.errors ? err.response.data.errors[0].message : err.response.data.msg)
        } else {
            alert(`Ops something went wrong, please try again later!`);
        }

    });
};

export async function deleteEntity<Data = unknown>(id: string, values: any, url: string, type: string) {
    await api.delete<Data>(`/${url}/${id}`, {data: values}).then(() => {
        alert(`Congratulations! ${type} ${values.name} was deleted!`);
    }).catch((err) => {
        if (err.response.data.status == 400) {
            alert(err.response.data.errors ? err.response.data.errors[0].message : err.response.data.msg)
        } else {
            alert(`Ops something went wrong, please try again later!`);
        }

    });
};

export async function post<Data = any>(values: any, url: string, type: string) {
    await api.post<Data>(`/${type}/`, values).then(() => {
        alert(`Congratulations! ${url} ${values.name} was created!`);
    }).catch((err) => {
        if (err.response.data.status == 400) {
            alert(err.response.data.errors ? err.response.data.errors[0].message : err.response.data.msg)
        } else {
            alert(`Ops something went wrong, please try again later!`);
        }

    });
};

