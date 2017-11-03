import React from 'react';

import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.filesChanged = this.filesChanged.bind(this);
  }

  filesChanged(e) {
    console.log('files changed', e.target.files);
    let filesInfo = [];
    [].slice.call(e.target.files).map(f => {
      let reader = new FileReader();
      reader.onload = (file) => {
        debugger;
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
      };
      reader.readAsDataURL(f);
    });
  }

  render() {
    return (
      <div>
        <h1>Profile component</h1>
        <form>
          <label>
            profile photo:
          <input type="file" name="name" onChange={this.filesChanged} multiple />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>filesInfo</p>
        <div>{this.state.files}</div>
      </div>
    );
  }
}

export default Profile;