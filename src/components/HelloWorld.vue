<template>
  <v-card>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Lista de Nutrición
      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Buscar" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-btn class="text-none font-weight-regular" color="success" @click="modal('', true)" prepend-icon="mdi-account"
      text="Agregar" variant="tonal"></v-btn>

    <v-data-table loading-text="Cargando... por favor espere" :loading="loading" :headers="headers" :items="desserts"
      :search="search">

      <template v-slot:item.action="{ item }">
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn @click="Eliminar(item)" density="compact" color="red" icon="mdi-delete"></v-btn>
            &nbsp;
            <v-btn @click="modal(item, false)" density="compact" color="warning" icon="mdi-pencil"></v-btn>
          </v-col>
        </v-row>
      </template>


    </v-data-table>
  </v-card>


  <v-dialog v-model="dialog" max-width="900">

    <v-card prepend-icon="mdi-account" :title="titleModal">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Nombre" v-model="inputs.name" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field hint="example of helper text only on focus" v-model="inputs.calories"
              label="Calorias"></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Grasa" v-model="inputs.fat" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Carbohidratos" v-model="inputs.carbs" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Proteinas" v-model="inputs.protein" required></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-text-field label="Hierro" v-model="inputs.iron" required></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Cerrar" variant="plain" @click="dialog = false"></v-btn>

        <v-btn color="success" v-if="btnAction" text="Agregar" variant="tonal" @click="Guardar()"></v-btn>
        <v-btn color="warning" v-else text="Actualizar" variant="tonal" @click="Editar()"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


</template>


<script>
import { ref } from 'vue';
export default {
  setup() {
    const inputs = ref({
      id: '',
      name: '',
      calories: '',
      fat: '',
      carbs: '',
      protein: '',
      iron: ''
    });
    return {
      inputs
    };
  },
  data() {
    return {
      loading: false,
      dialog: false,
      search: '',
      titleModal: '',
      headers: [
        { align: 'start', key: 'name', sortable: false, title: 'Nombres' },
        { key: 'calories', title: 'Calorias' },
        { key: 'fat', title: 'Grasa (g)' },
        { key: 'carbs', title: 'Carbohidratos (g)' },
        { key: 'protein', title: 'Proteinas (g)' },
        { key: 'iron', title: 'Hierro (%)' },
        { key: 'action', title: 'Accion' },
      ],
      desserts: [],
      btnAction: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.axios.get('https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/nutricion')
        .then((response) => {
          this.desserts = response.data
          this.loading = false
        })
        .catch((error => {
          console.log(error)
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: error,
            showConfirmButton: false,
            timer: 1500
          });
        }))
    },
    Eliminar(item) {
      const data = { ...item }
      this.$swal.fire({
        title: "Esta Seguro?",
        text: "Desea eliminar este registro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminalo!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(`https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/nutricion/${data.id}`)
            .then((response) => {
              console.info(response)
              this.desserts = []
              this.$swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro Eliminado",
                showConfirmButton: false,
                timer: 1500
              });
              this.getList()
            })
            .catch((error => {
              console.error(error)
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Opps! Algo salio mal!",
                showConfirmButton: false,
                timer: 1500
              });
            }))
        }
      });

    },
    ModalUpdate(data) {
      this.inputs.id = data.id
      this.inputs.name = data.name
      this.inputs.calories = data.calories
      this.inputs.fat = data.fat
      this.inputs.carbs = data.carbs
      this.inputs.protein = data.protein
      this.inputs.iron = data.iron
      this.dialog = true
    },
    modal(item, t) {
      this.dialog = true
      if (t == true) {
        this.titleModal = 'Agregar Registro'
        this.btnAction = true
      } else {
        this.titleModal = 'Actualizar Registro'
        this.btnAction = false
        this.ModalUpdate(item)
      }
    },
    Editar() {
      this.axios.put(`https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/nutricion/${this.inputs.id}`, this.inputs)
        .then((response) => {
          console.log(response)
          this.desserts = []
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro Actualizado",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog = false
          this.getList()
          this.Limpiar()
        })
        .catch((error) => {
          console.log(error)
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Oops! Algo salio mal",
            showConfirmButton: false,
            timer: 1500
          });
        })
    },
    Guardar() {
      this.axios.post('https://65f34f70105614e654a05799.mockapi.io/inea/api/v1/nutricion', this.inputs)
        .then((response) => {
          console.log(response)
          this.desserts = []
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro Guardado",
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog = false
          this.getList()
          this.Limpiar()
        })
        .catch((error) => {
          console.log(error)
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops! Algo salio mal",
            showConfirmButton: false,
            timer: 1500
          });
        })
    },
    Limpiar() {
      this.inputs = {
        id: '',
        name: '',
        calories: '',
        fat: '',
        carbs: '',
        protein: '',
        iron: ''
      }
    }
  }

}
</script>



<!--
vue add @vue/pwa
npm install -g @ionic/cli
npx cap init visitantes ve.gob.inea.visitantes
npm install @capacitor/android
npm install @capacitor/ios
npx cap add android
npx cap open android
npx cap add ios
npx cap open ios
 -->
