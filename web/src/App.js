import React from 'react';
import './App.css';

const endpoint = "/api/user";

const getUsers = async () => {
  const response = await fetch(
    endpoint,
    {
      method: 'GET'
    });

  return await response.json();
};

const insertUser = async (user) => {
  const response = await fetch(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

  return await response.json();
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    getUsers()
      .then(users => this.setState({users}))
      .catch(error => {
        console.error({
          message: 'Error fetching users',
          err: error
        });
        return Promise.reject(error);
      })
  }

  addUser() {
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    console.log(name, age);

    insertUser({name, age})
      .then(() => {
        this.fetchUsers();
      })
      .catch(() => {
        this.fetchUsers();
      })
  }

  render() {
    return (
      <div className="App">
        <table>
          <tr>
            <th>number</th>
            <th>name</th>
            <th>age</th>
          </tr>
          {
            this.state.users.map(user => {
              return (<tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
              </tr>)
            })
          }
        </table>

        <div>
          <input type="text" id="name"/>
          <input type="text" id="age"/>
          <button onClick={this.addUser.bind(this)}>Add</button>
        </div>
      </div>
    )
  }
}

export default App;
