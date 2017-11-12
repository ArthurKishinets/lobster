import React from 'react';

import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      filesToSend: [],
    };
    this.filesChanged = this.filesChanged.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentWillMount() {
    console.log('user ', this.props.user);
  }
  componentDidMount() {
    console.log('user ', this.props.user);
  }

  saveUser(e) {
    e.preventDefault();
    if (!this.state.files.length) {
      console.log('no files');
      return;
    }
    let formData = new FormData();
    for (let file in this.state.filesToSend) {
      console.log(' files to append ', this.state.filesToSend[file].name, this.state.filesToSend[file]);
      formData.append(`${this.state.filesToSend[file].name}`, this.state.filesToSend[file]);
    }
    fetch('/api/users/profile/photo', {
      method: 'POST',
      credentials: 'include',
      headers: {
        //"Content-Type": "application/octet-stream",
      },
      body: formData,
    })
    .then(r => r.json())
    .then(r => {
      console.log('r ', r);
      return r;
    })
    .then(r => {
      this.props.updateUser({ photos: r.photos });
      for (var key of formData.keys()) {
        formData.delete(key);
      };
      this.setState({
        files: [],
      });
    })
    .catch(e => console.error(e));
  }

  filesChanged(e) {
    e.persist();
    console.log('files changed', e.target.files);
    let copideFiles = Object.assign({}, e.target.files);
    this.setState((prevState) => ({
      filesToSend: copideFiles,
    }));
    let filesInfo = [];
    [].slice.call(e.target.files).map(f => {
      let reader = new FileReader();
      reader.onload = (file) => {
        filesInfo.push(
          <div key={f.lastModified}>
            <span>{f.name}</span>
            <span>{f.size}</span>
            <img width="100px" height="100px" src={file.currentTarget.result} alt="photo"/>
            <p>bytes</p>
          </div>
        );
        this.setState({
          files: filesInfo,
        });
        e.target.value = null;
      };
      reader.readAsDataURL(f);
    });
  }

  render() {
    return (
      <div>
        <h1>Profile component</h1>
        <form onSubmit={this.saveUser}>
          <label>
            profile photo:
          <input type="file" name="name" onChange={this.filesChanged} multiple />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>filesInfo</p>
        <div>{this.state.files}</div>
        <div>{this.props.user.photos && this.props.user.photos.map(photo => {
          return <img key={photo} src={photo} alt="photo"/>;
        })}</div>
      </div>
    );
  }
}

export default Profile;