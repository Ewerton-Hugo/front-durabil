<script setup></script>

<template>
  <div class="allignFields">
    <div class="widthFields">
      <v-text-field
        type="date"
        v-model="prediosBanco.data_inicio"
        label="Data Inicio"
      />
    </div>
    <div class="widthFields">
      <v-text-field
        type="date"
        v-model="prediosBanco.data_fim"
        label="Data Fim"
      />
    </div>
    <div class="widthFields">
      <v-autocomplete
        v-model="prediosBanco.status"
        :items="tipos"
        label="Atividades"
      ></v-autocomplete>
    </div>
    <div @click="submit" class="btn">
      <v-btn variant="tonal"> Pesquisar </v-btn>
    </div>
  </div>

  <v-data-table
    :headers="headers"
    :search="searchQuery"
    :items="prediosTeste"
    :rows-per-page-items="itemsPerPage"
    :footer-props="footerProps"
    density="default"
  >
    <!-- eslint-disable vue/valid-v-slot -->
    <template v-slot:item.ambiente_descricao="{ item }">
      {{ item.ambiente_descricao }}
    </template>
    <template v-slot:item.sistema="{ item }">
      {{ item.sistema }}
    </template>
    <template v-slot:item.data="{ item }">
      {{ item.data }}
    </template>
    <template v-slot:item.complexidade="{ item }">
      {{ item.complexidade }}
    </template>
    <template v-slot:item.executor="{ item }">
      {{ item.executor }}
    </template>
    <template v-slot:item.atividade_descricao="{ item }">
      {{ item.atividade_descricao }}
    </template>
    <template v-slot:item.tipo_atividade="{ item }">
      {{ item.tipo_atividade }}
    </template>
  </v-data-table>
  <div @click="returnToMainPage" class="btn">
    <v-btn variant="tonal">Retornar </v-btn>
  </div>
</template>
<script>
import { VDataTable } from "vuetify/lib/labs/VDataTable/index.mjs";
import axios from "axios";
export default {
  components: {
    VDataTable,
  },
  data() {
    return {
      prediosTeste: [],
      prediosBanco: {
        data_inicio: null,
        data_fim: null,
        status: "PENDENTES",
      },
      searchQuery: "",
      itemsPerPage: [20],
      footerProps: [20],
      tipos: ["PENDENTES", "EXECUTADAS"],
      headers: [
        {
          title: "Ambiente",
          value: "ambiente_descricao",
        },
        {
          title: "Sistema",
          value: "sistema",
        },
        {
          title: "Data",
          value: "data",
        },
        {
          title: "Mão de Obra",
          value: "complexidade",
        },
        {
          title: "Executor",
          value: "executor",
        },
        {
          title: "Atividade",
          value: "atividade_descricao",
        },
        {
          title: "Tipo",
          value: "tipo_atividade",
        },
      ],
    };
  },
  computed: {
    filteredPrediosEquipamentos() {
      const query = this.searchQuery.toLowerCase().trim();

      const filteredItems = this.prediosTeste.filter((item) => {
        const descricao = item.ambiente_descricao.toLowerCase();
        return descricao.includes(query);
      });

      // Ordena os itens pelo nome da descrição
      return filteredItems.sort((a, b) =>
        a.descricao.localeCompare(b.descricao)
      );
    },
  },
  methods: {
    async submit() {
      const postData = {
        token_predio: "rtrlv",
        status: this.prediosBanco.status,
        data_inicio: this.prediosBanco.data_inicio,
        data_fim: this.prediosBanco.data_fim,
        user_token: "Uv5xT",
      };

      try {
        const response = await axios.post(
          "https://basck-durabil2.onrender.com/atividadesPredio",
          postData
        );

        // Analise os dados retornados do servidor
        const parsedData = JSON.parse(response.data);

        // Verifique se os dados estão no formato esperado e atribua-os à tabela
        if (Array.isArray(parsedData)) {
          const allActivities = [];
          parsedData.forEach((item) => {
            if (Array.isArray(item.atividades)) {
              allActivities.push(...item.atividades);
            }
          });
          this.prediosTeste = allActivities;
        }
        if (response.status === 200) {
          console.log("Pesquisa feita com sucesso");
        }
      } catch (error) {
        console.error("Erro na criação do registro:", error);
      }
    },
    returnToMainPage() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.container {
  margin-right: 10px;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-td {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-pointer {
  cursor: pointer;
}

.red-icon {
  color: red;
}

.gray-icon {
  color: gray;
}
.allignFields {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.widthFields {
  width: 260px;
}
</style>
