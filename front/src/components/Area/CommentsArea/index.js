import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Comment, Form, Header, Segment, Divider,
} from 'semantic-ui-react';
// import Moment from 'react-moment';
import { Route } from 'react-router-dom';

import './commentsarea.scss';

class CommentsArea extends React.Component {
  componentDidUpdate(prevProps) {
    const { comments } = this.props;
    const Refresh = ({ path = '/' }) => (
      <Route
        path={path}
        component={({ history, location, match }) => {
          history.replace({
            ...location,
            pathname: location.pathname.substring(match.path.length),
          });
          return null;
        }}
      />
    );
    if (comments !== prevProps.comments) {
      return <Refresh path="/areas/:slug" />;
    }
  }

  render() {
    const {
      comments,
      areaId,
      logged,
      contentValue,
      changeInputValue,
      addArea,
      newContent,
      doImage,
    } = this.props;

    const handleChange = (evt) => {
      const { value: fieldValue } = evt.target;
      const fieldName = evt.target.id;
      changeInputValue(fieldValue, fieldName);
    };
    const handleFile = (evt) => {
      evt.preventDefault();
      const image = evt.target.files[0];
      console.log(image);
      const file = window.URL.createObjectURL(image);
      console.log(file);
      doImage(file);
    };
    const handleSubmit = (evt) => {
      evt.preventDefault();
      addArea(areaId);
      newContent();
    };

    return (
      <Comment.Group id="comments-section">
        <Segment className="services" textAlign="center">
          <Header as="h3">Commentaires</Header>
        </Segment>

        {comments.length !== 0 && comments.map((comment) => {
          const currentDate = new Date(comment.createdAt);

          const date = currentDate.getDate();
          const month = currentDate.getMonth();
          const year = currentDate.getFullYear();
          const hour = currentDate.getHours();
          const minute = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
          const monthNames = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
          ];
          return (
            <>
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Author as="a">{comment.user.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>
                    posté le {date} {monthNames[month]} {year} à {hour}h{minute}
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.description}</Comment.Text>
                </Comment.Content>
              </Comment>

              <Divider />
            </>
          );
        })}
        {comments.length === 0 && (
          <>
            <Comment key="999">
              <Comment.Content>
                <Comment.Text>
                Il n'existe aucun commentaire pour cette aire pour le moment
                </Comment.Text>
              </Comment.Content>
            </Comment>
            <Divider />
          </>
        )}
        {logged && (
        <Form id="form" onSubmit={handleSubmit}>
          <Form.Field className="field">
            <label className="label">
            Votre message :
              <Form.TextArea
                type="text"
                placeholder="Ajoutez un commentaire"
                id="commentContent"
                name="commentContent"
                value={contentValue}
                onChange={handleChange}
              />
            </label>
          </Form.Field>
          <Form.Field className="label">
            <label>Select file</label>
            <input type="file" name="file" onChange={handleFile} />
          </Form.Field>
          <Button content="Ajoutez un commentaire" labelPosition="left" icon="edit" primary />
        </Form>
        )}
      </Comment.Group>
    );
  }
}

CommentsArea.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default CommentsArea;
