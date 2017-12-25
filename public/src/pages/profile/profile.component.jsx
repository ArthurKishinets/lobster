import React from 'react';
import { Redirect } from 'react-router'

import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.filesChanged = this.filesChanged.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.formChanged = this.formChanged.bind(this);
  }

  saveUser(e) {
    e.preventDefault();
    let formData = new FormData();
    for (let key in this.props.profile) {
      if (typeof this.props.profile[key] === 'object') {
        for (let innerKey in this.props.profile[key]) {
          formData.append(`${key}_${innerKey}`, this.props.profile[key][innerKey]);
        }
        continue;
      }
      formData.append(`${key}`, this.props.profile[key]);
    }
    fetch('/api/self', {
      method: 'POST',
      credentials: 'include',
      headers: {
      },
      body: formData,
    })
    .then(r => r.json())
    .then(r => {
      console.log('r ', r);
      this.props.updateUser(r.result);
      for (var key of formData.keys()) {
        formData.delete(key);
      };
      this.props.updateProfile({
        gallery: undefined,
        filesToSend: [],
      });
    })
    .catch(e => console.error(e));
  }

  filesChanged(e) {
    e.persist();
    console.log('files changed', e.target.files);
    let filesToSend = Object.assign({}, e.target.files);
    this.props.updateProfile({
      filesToSend,
    });
    let gallery = [];
    [].slice.call(e.target.files).map(f => {
      let reader = new FileReader();
      reader.onload = (file) => {
        gallery.push(
          <div key={`${f.lastModified}${f.name}${f.size}`}>
            <span>{f.name}</span>
            <span>{f.size}</span>
            <img width="100px" height="100px" src={file.currentTarget.result} alt="photo"/>
            <p>bytes</p>
          </div>
        );
        this.props.updateProfile({
          gallery,
        });
        e.target.value = null;
      };
      reader.readAsDataURL(f);
    });
  }

  formChanged(e) {
    e.persist();
    if (/(looking_for_)(.{1,})/.test(e.target.name)) {
      return this.props.updateProfile({
        looking_for : {
          [e.target.name.replace('looking_for_', '')]: e.target.value,
        }
      });
    }
    this.props.updateProfile({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if (_.isEmpty(this.props.user) && this.props.main.userReceived) return <Redirect to='/auth'></Redirect>;
    return (
      <div>
        <h1>{this.props.user.nickname}</h1>
        <form onSubmit={this.saveUser}>
          <textarea name="about_me" id="aboutme" cols="30"
            rows="10" defaultValue="Tell about youself" value={this.props.profile.about_me}
            onChange={this.formChanged}></textarea><br></br>

          <label htmlFor="currentCity">My current city</label><br></br>
          <input type="text" name="city" id="currentCity" onChange={this.formChanged}
            value={this.props.profile.city}/><br></br>
          <label htmlFor="currentCity">My age</label><br></br>
          <input type="number" name="age" id="age" onChange={this.formChanged}
            value={this.props.profile.age}/><br></br>
    
          I'm looking for: <br></br>
          <input type="radio" name="looking_for_gender" id="lookingGenderMale"
            checked={(this.props.profile.looking_for || {}).gender === 'male'}
            value='male' onChange={this.formChanged}/>
          <label htmlFor="lookingGenderMale">looking Gende Male</label><br></br>
          <input type="radio" name="looking_for_gender" id="lookingGenderFemale"
            checked={(this.props.profile.looking_for || {}).gender === 'female'}
            value='female' onChange={this.formChanged}/>
          <label htmlFor="lookingGenderFemale">looking Gender Female</label><br></br>
          <label htmlFor="lookingAge">looking for ages</label><br></br>
          <input name="looking_for_age" id="lookingAge" type="range" onChange={this.formChanged}
            value={(this.props.profile.looking_for || {}).age}/><br></br>

          <label>
            profile photo:
          <input type="file" name="name" onChange={this.filesChanged} multiple />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p>Gallery</p>
        <div>{this.props.profile.gallery}</div>
        <div>{this.props.user.photos && this.props.user.photos.map(photo => {
          return <img key={photo} src={photo} alt="photo"/>;
        })}</div>
      </div>
    );
  }
}

export default Profile;