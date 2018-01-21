import React from 'react';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import './profile.scss';

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.photosChanged = this.photosChanged.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.formChanged = this.formChanged.bind(this);
  }

  async saveUser() {
    try {
      let res = await fetch('/api/self', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(this.props.profile)
      });
      res = await res.json();
      this.props.updateUser(res.result);
    } catch (e) {
      console.error(e);
    }
  }

  async savePhotos(photos) {
    try {
      let res = await fetch('/api/self/photos', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(photos)
      });
      res = await res.json();
      this.props.updateUser(res.result);
      this.props.updateProfile({
        gallery: undefined,
        filesToSend: []
      });
    } catch (e) {
      console.error(e);
    }
  }

  photosChanged (e) {
    e.persist();
    const self = this;
    let filesToSend = [];
    let gallery = [];
    [].slice.call(e.target.files).map(f => {
      let reader = new FileReader();
      reader.onload = (file) => {
        gallery.push(
          <div key={`${f.lastModified}${f.name}${f.size}`}>
            <span>{f.name}</span>
            <span>{f.size}</span>
            <img width='100px'
              height='100px'
              src={file.currentTarget.result}
              alt='photo' />
            <p>bytes</p>
          </div>
        );
        this.props.updateProfile({
          gallery
        });
        filesToSend.push(file.currentTarget.result);
        if (e.target.files.length === filesToSend.length) {
          self.savePhotos(filesToSend);
          e.target.value = null;
        }
      };
      reader.readAsDataURL(f);
    });
  }

  formChanged (e) {
    e.persist();
    if (/(looking_for_)(.{1,})/.test(e.target.name)) {
      return this.props.updateProfile({
        looking_for: {
          [e.target.name.replace('looking_for_', '')]: e.target.value
        }
      });
    }
    this.props.updateProfile({
      [e.target.name]: e.target.value
    });
  }

  render () {
    if (this.props.main.loggedOut) return <Redirect to='/auth' />;
    if (!this.props.main.userReceived) return <div />;
    if (_.isEmpty(this.props.user) && this.props.main.userReceived) {
      return <Redirect to='/auth' />;
    }
    return (
      <div>
        <h1>{this.props.user.nickname}</h1>
        <form onSubmit={this.saveUser} className='profile-form'>

          <TextField
            name='about_me'
            className='ui-input profile-aboutme'
            id='textarea'
            label='Tell about youself'
            multiline
            rows='4'
            value={this.props.profile.about_me}
            onChange={this.formChanged}
            margin='normal'
          />

          <TextField
            className='ui-input profile-aboutme'
            name='city'
            id='currentCity'
            label='current City'
            type='text'
            autoComplete='current-password'
            margin='normal'
            defaultValue={this.props.profile.city}
            value={this.props.profile.city}
            onChange={this.formChanged}
          />

          <TextField
            className='ui-input profile-aboutme'
            name='age'
            id='age'
            label='my age'
            type='number'
            autoComplete='current-password'
            margin='normal'
            value={this.props.profile.age}
            onChange={this.formChanged}
          />

          <FormControl component='fieldset' required>
            <FormLabel component='legend'>My gender</FormLabel>
            <RadioGroup
              name='gender'
              value={this.props.profile.gender}
              onChange={this.formChanged}
            >
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel value='female' control={<Radio />} label='Female' />
            </RadioGroup>
          </FormControl><br />

          <FormControl component='fieldset' required>
            <FormLabel component='legend'>I'm looking for:</FormLabel>
            <RadioGroup
              name='looking_for_gender'
              value={(this.props.profile.looking_for || {}).gender}
              onChange={this.formChanged}
            >
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel value='female' control={<Radio />} label='Female' />
            </RadioGroup>
          </FormControl><br />

          <label htmlFor='lookingAge'>looking for ages</label><br />

          <input name='looking_for_age' id='lookingAge' type='range' onChange={this.formChanged}
            value={(this.props.profile.looking_for || {}).age} /><br />

          <input
            style={{display: 'none'}}
            type='file' name='name'
            onChange={this.photosChanged}
            id='raised-button-file'
            multiple />

          <label htmlFor='raised-button-file'>
            <Button raised component='span'>
              profile photo:
            </Button>
          </label>

          <Button onClick={this.saveUser} raised color='primary'>
            Submit
          </Button>
        </form>

        <p>Gallery</p>
        <div>{this.props.profile.gallery}</div>
        <div>{this.props.user.photos && this.props.user.photos.map(photo => {
          return <img key={photo} src={photo} alt='photo' />;
        })}</div>
      </div>
    );
  }
}

export default Profile;
