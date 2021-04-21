import axios from 'axios'

export default {
    note:{
        list: async (folderId) => await axios.get(`/api/notes/list?folderId=${folderId}`),
        create: async (data) => await axios.post('/api/notes/',data),
        update: async (id, data) => await axios.post(`/api/notes/${id}`,data),
        delete: async (id) => await axios.delete(`/api/notes/${id}`),
        get: async (id) => await axios.get(`/api/notes/${id}`)
    },
    folder:{
        list: async () => await axios.get('/api/folders'),
        create: async (name) => {
            console.log(name)
            return axios.post(`/api/folders/${name}`);}
    }
}