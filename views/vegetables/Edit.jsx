const React = require("react");

class Edit extends React.Component {
  render() {
    return (
      <form
        action={`/api/vegetables/${this.props.id}?_method=PUT`}
        method="POST"
      >
        Name:{" "}
        <input
          type="text"
          name="name"
          defaultValue={this.props.vegetables.name}
        />{" "}
        <br />
        Color:{" "}
        <input
          type="text"
          name="color"
          defaultValue={this.props.vegetables.color}
        />{" "}
        <br />
        Is Ready to Eat:
        {this.props.vegetables.readyToEat ? (
          <input type="checkbox" name="readyToEat" defaultChecked />
        ) : (
          <input type="checkbox" name="readyToEat" />
        )}
        <br />
        <input type="submit" name="" value="Edit vegetables" />
      </form>
    );
  }
}

module.exports = Edit;
