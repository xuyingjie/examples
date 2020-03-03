<template>
    <main>
        <navbar :auth="auth" @set-auth="setAuth"></navbar>

        <section class="layer">
            <template v-if="auth">
                <file-system :hash="hash" v-if="hash.match('#/root')" />
                <media v-else-if="hash==='#/media'" />
                <plain v-else />
            </template>
            <join v-if="hash==='#/join'" />
        </section>
    </main>
</template>

<script>
import { ref } from 'vue'

import Navbar from '@/components/navbar.vue'
import Plain from '@/components/plain.vue'
import Media from '@/components/media.vue'
import FileSystem from '@/components/file-system.vue'
import Join from '@/components/join.vue'

export default {
    components: { Navbar, Plain, Media, FileSystem, Join },

    setup() {
        const auth = ref(Boolean(localStorage.a))
        const hash = useHash()

        function setAuth(value) {
            auth.value = value
        }

        return { auth, setAuth, hash }
    }
}

function useHash() {
    const hash = ref(location.hash)

    window.onhashchange = () => {
        hash.value = location.hash
    }

    return hash
}
</script>
