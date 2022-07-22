<template>
    <div class="flex items-center justify-between py-4">
        <button 
            class="bg-indigo-500 p-3"
            v-on:click.prevent="addToCart"
        >Ajoutez au panier</button>
    </div>
</template>

<script setup>
    import { inject } from '@vue/runtime-core';
import useProduct from '../composables/products'

    const { add } = useProduct();
    const productId = defineProps(['productId']);

    const emitter = require('tiny-emitter/instance');   
    const toast = inject('toast');

    const addToCart = async  () => {
        await axios.get('/sanctum/csrf-cookie');
        await axios.get('/api/user')
            .then(async(res) => {
               let cartCount = await add(productId);
               emitter.emit('cartCountUpdated', cartCount);
               toast.success('Produit ajouté au panier');
            })
            .catch(() => {
                toast.error('Merci de vous connectez pour ajouter un produit');
            }); 
    }
</script> 