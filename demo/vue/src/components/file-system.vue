<template>
    <div class="row card">
        <div class="tree">
            <span>/</span>
            <span>
                <a
                    v-for="(subname, index) of dirname.split('/')"
                    :key="index"
                    @click="cd(dirname, index)"
                >{{subname}}/</a>
            </span>
            <input type="text" v-model="folderName" @keyup.enter="createFolder" />
            <label>
                UPLOAD FILE
                <input type="file" multiple @change="handleFileChange" />
                <i ref="progress"></i>
            </label>
        </div>

        <template v-for="(item,i) in list">
            <p :key="item.id" v-if="item.dirname">
                <span @click="cd(item.dirname)">{{item.name}}/</span>
            </p>
            <p :key="item.id" v-else>
                <span @click="handleDownload(item,i)">
                    {{item.name}} - {{(item.size/1024).toFixed(2) + 'KB'}}
                    <i
                        :ref="el=>progressArr[i]=el"
                    ></i>
                </span>
                <sub>
                    <a @click.stop="handleDel(item.id)">✖</a>
                </sub>
            </p>
        </template>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { getList, del } from '@/utils'
import { upload, download } from '@/utils/file'

export default {
    setup(props) {
        const state = reactive({
            dirname: '',
            list: [],
            folderName: '',
            progress: null,
            progressArr: [],
        })

        async function fetchData() {
            const list = await getList(state.dirname)
            state.list = list.map(item => {
                if (item.text) {
                    const [name, type] = item.text.split(',')
                    return { ...item, name, type }
                } else {
                    const name = item.dirname.replace(`${state.dirname}/`, '')
                    return { ...item, name }
                }
            })
        }

        function cd(dirname, index) {
            if (index !== undefined) {
                dirname = dirname.split('/').slice(0, index + 1).join('/')
            }
            location.href = `#/${dirname}`
        }

        function createFolder() {
            cd(`${state.dirname}/${state.folderName}`)
            state.folderName = ''
        }

        async function handleFileChange(e) {
            const files = e.target.files
            await upload({
                files,
                dirname: state.dirname,
                onprogress: (e) => {
                    if (e.lengthComputable) state.progress.style.width = (e.loaded === e.total) ? 0 : e.loaded / e.total * 100 + '%'
                }
            })
            fetchData()
        }

        async function handleDownload({ id, name, type }, index) {
            download({
                key: `${state.dirname}/${id}`,
                name,
                type,
                onprogress: (e) => {
                    if (e.lengthComputable) state.progressArr[index].style.width = (e.loaded === e.total) ? 0 : e.loaded / e.total * 100 + '%'
                }
            })
        }

        async function handleDel(id) {
            await del(`${state.dirname}/${id}`)
            fetchData()
        }

        watchEffect(() => {
            state.dirname = props.hash.slice(2)
            fetchData()
        })

        return {
            ...toRefs(state),
            handleFileChange,
            handleDownload,
            handleDel,
            cd,
            createFolder,
        }
    }
}

</script>

<style scoped>
.row {
    padding: 1rem;
}
.row * {
    font-family: "Source Code Pro", Consolas, monospace;
}
@media screen and (max-width: 39.9375em) {
    .row {
        padding: 0.5rem;
    }
}
.tree {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #2ba6cb;
}
.tree input[type="text"] {
    height: 20px;
    width: 80px;
    background: none;
    border-bottom: 1px solid #d5d5d5;
    font-size: 1rem;
    padding: 0;
    margin: 0 0.2rem;
}
.tree input[type="file"] {
    display: none;
}
.tree label {
    position: relative;
    cursor: pointer;
    margin: 0 0 0 auto;
}
p {
    word-break: break-all;
    color: #676767;
    margin-bottom: 0.5rem;
}
p > span {
    position: relative;
    cursor: pointer;
}
i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
}
</style>