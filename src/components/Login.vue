<template>
    <v-container fill-height justify-center>
        
        <v-card class="flex xs6">
            <v-card-title>Логин</v-card-title>
            <v-card-text>
                <v-text-field v-model="login" label="Логин"></v-text-field>
                <v-text-field v-model="password" label="Пароль"></v-text-field>
            </v-card-text>
            <v-card-actions class="flex justify-end">
                <v-btn text primary>Логин</v-btn>
            </v-card-actions>
        </v-card>
        
    </v-container>
</template>

<script>
export default {
    data: () =>({
        login:'',
        password:''
    })
}
</script>

<style>

</style>