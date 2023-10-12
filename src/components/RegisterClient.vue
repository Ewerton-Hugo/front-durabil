<template>
  <div class="arrow" @click="returnToMainPage">
   <font-awesome-icon :icon="['fas', 'arrow-left']" size="2xl" />
 </div>
 <form>
   <v-text-field
    v-model="predios.descricao"
    :error-messages="descricao.errorMessage.value"
    label="Descrição"
  ></v-text-field>

  <v-text-field
    v-model.number="predios.numero_ocupantes"
    v-mask="'###'"
    :error-messages="numero_ocupantes.errorMessage.value"
    label="Numero Ocupantes"
  ></v-text-field>

  <v-text-field
    v-mask="'###.##'"
    v-model.number="predios.area"
    :error-messages="area.errorMessage.value"
    label="Área(m2)"
  ></v-text-field>

   <v-select
    v-model="predios.tabvalores_tipo_ambiente_id"
    :items="tipos"
    :item-title="tipo => tipo.descricao"
    :item-value="tipo => tipo.id"
    :error-messages="tabvalores_tipo_ambiente_id.errorMessage.value"
    label="Tipo"
  ></v-select>

  <v-select
    v-model="predios.predio_area_id"
    :items="areas"
    :item-title="area => area.descricao"
    :item-value="area => area.id"
    :error-messages="predio_area_id.errorMessage.value"
    label="Área"
  ></v-select>

   <v-btn
     class="me-4"
     @click="submit"
   >
     Criar
   </v-btn>

   <v-btn @click="handleReset">
     Limpar
   </v-btn>
 </form>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      predios: {
        descricao: undefined,
        numero_ocupantes: undefined,
        area: undefined,
        tabvalores_tipo_ambiente_id:undefined,
        predio_area_id: undefined,
      },
        tipos: [{
          descricao:undefined,
          id:undefined
        }],
        areas: [{
          descricao:undefined,
          id:undefined
        }] // Inicialize o items como um array vazio
    };
  },

 methods: {
   returnToMainPage() {
     this.$router.push('/home');
   },
   async loadTipos() {
      try {
        const response = await axios.get('http://localhost:3000/TabValores');
        this.tipos = response.data.map((tipo) => ({
          descricao:tipo.descricao,
          id:tipo.id
        }));
      } catch (error) {
        console.error('Erro ao carregar tipos:', error);
      }
    },
    async loadAreas() {
      try {
        const response = await axios.get('http://localhost:3000/PrediosAreas')
        this.areas = response.data.map((area) =>({
          descricao:area.descricao,
          id:area.id
        }));
      } catch (error) {
        console.error('Erro ao carregar áreas:', error);
      }
    },
   async submit() {
      const data = {
        descricao: this.predios.descricao,
        numero_ocupantes: this.predios.numero_ocupantes,
        area: this.predios.area,
        tabvalores_tipo_ambiente_id: this.predios.tabvalores_tipo_ambiente_id,
        predio_area_id: this.predios.predio_area_id,
      }

      try {
        const response = await axios.post('http://localhost:3000/PrediosAmbiente', data)
        this.$router.push('/home') // Redirecione para a página principal ou faça qualquer outra ação desejada
      if (response.status === 200 ) {
        console.log('Resgistro criado com sucesso')
      }
      } catch (error) {
        console.error('Erro na criação do registro:', error)
        console.log(typeof this.predios.predio_area_id,typeof this.predios.tabvalores_tipo_ambiente_id);
      }
    },
 },
 mounted() {
    this.loadTipos();
    this.loadAreas();
  },
};
</script>
<script setup>

 import { useField, useForm } from 'vee-validate'


 const { handleReset } = useForm({
   validationSchema: {
     descricao (value) {
       if (value?.length >= 50) return true

       return 'Name needs to be at least 50 characters.'
     },
     numeroOcupantes(value) {
       if (value?.length < 4 && /[0-4-]+/.test(value)) return true

       return 'o numero de ocupantes deve ser até 4 digitos'
     },
     area (value) {
       if (value?.length > 11 && /[0-11-]+/.test(value)) return true

       return 'Phone number needs to be at least 11 digits.'
     },
     tabvalores_tipo_ambiente_id(value) {
       if (value) return true

       return 'Select an item.'
     },
     predio_area_id(value) {
       if (value) return true

       return 'Select an item.'
     },
   },
 })
 const descricao = useField('descricao')
 const numero_ocupantes = useField('numero_ocupantes')
 const area = useField('area')
 const tabvalores_tipo_ambiente_id = useField('tabvalores_tipo_ambiente_id')
 const predio_area_id = useField('predio_area_id')

</script>
<style scoped>
.arrow{
 margin-bottom:20px ;
}
</style>
