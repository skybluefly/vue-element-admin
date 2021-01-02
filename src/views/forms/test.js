export default ({ props, listeners }) => {
  return <p vOn:click={listeners.click}>hello {props.message}</p>
}
