import './scss/index.scss'
async function as() {
  return await Promise.resolve('working')
}
as().then((e) => console.log(e))
