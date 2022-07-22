import axios from "axios";
import { ref } from "vue";

export default function useProduct() {

    const products = ref([]);

    const getProducts = async() => {
        let response = await axios.get('/api/products')
        products.value = response.data.cartContent;
    }

    const add = async(productId) => {
        let response = await axios.post('/api/products', {
            productId: productId
        });
        return response.data.count;
    }

    const getCount = async() => {
        // let response = await axios.post('/api/products/count', {
        //     count: count
        // })
        // console.log(response);
        let response = await axios.get('/api/products/count');
        return response.data.count;
        console.log(response);
    }



    return {
        add,
        getCount,
        products,
        getProducts,
    }
}