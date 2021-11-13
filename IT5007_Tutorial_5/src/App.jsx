const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.name}</td>
      <td>{issue.phone}</td>
      <td>{issue.time.toDateString()}</td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}


class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      name: form.name.value, phone: form.phone.value, time: form.time.value,
    }
    this.props.createIssue(issue);
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="phone" placeholder="Phone" />
        <input type="text" name="time" placeholder="Time" />
        <button>Add</button>
      </form>
    );
  }
}

class IssueDelete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueDelete;
    const issue = {
      name: form.name.value,
    }
    this.props.deleteIssue(issue);
  }

  render() {
    return (
      <form name="issueDelete" onSubmit={this.handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class IssueShow extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueShow;
    this.props.loadData();
  }

  render() {
    return (
      <form name="issueShow" onSubmit={this.handleSubmit}>
        <button>Show</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { 
      issues: [], 
      isShow : 'none'};
    
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.loadData = this.loadData.bind(this)
  }

  // componentDidMount() {
  //   this.loadData();
  // }

  async loadData() {
    const query = `query {
      issueList {
        id name phone time
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ 
        issues: data.issueList,
        isShow: 'block' });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    // if (data) {
    //   this.loadData();
    // }

  }
  
  async deleteIssue(issue) {
    const query = `mutation issueDelete($issue: Issue_2!) {
      issueDelete(issue:$issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    // if (data) {
    //   this.loadData();
    // }
    }

  render() {
    return (
      <React.Fragment>
        <h1>Hotel California Waitlist System</h1>
        <hr />
        <div style = {{display: this.state.isShow}}> <IssueTable issues={this.state.issues} /> </div>
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
        <IssueDelete deleteIssue={this.deleteIssue} />
        <hr />
        <IssueShow loadData={this.loadData} />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
