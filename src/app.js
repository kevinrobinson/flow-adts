/* @flow */
var React = require('react');
var dom = React.DOM;


// Describe an algebraic data type for the component's state.
type AppState = ViewingState | EditingState;
type ViewingState = { mode: 'viewing' };
type EditingState = { mode: 'editing'; articleId: number };


// These are helper functions for creating data structure describing
// the component's state.  These are useful in general, but with
// the flow annotations, we can catch mistakes even without this
// structure.
var States = {
  Editing(articleId: number): AppState {
    return {
      mode: 'editing',
      articleId: articleId
    };
  },

  Viewing(): AppState {
    return {
      mode: 'viewing'
    };
  }
};


// Defining some styles
var styles = {
  navigationTitle: {
    color: 'white',
    paddingRight: 20
  },
  navigationFrame: {
    padding: 10,
    background: '#101829'
  },
  padded: {
    padding: 10
  },
  viewingPage: {
    background: '#f4cbab'
  },
  editingPage: {
    background: '#8cadd3'
  }
};


class AppComponent extends React.Component {
  state: AppState;

  constructor(props: any, children: any) {
    this.state = States.Viewing();
  }

  // This is a shim to be able to attach flow annotations
  // and enforce type safety in calls to `setState` within this component.
  setState(object: AppState) {
    super.setState(object);
  }

  onEditModeClicked() {
    this.setState(States.Editing(42));
  }

  onViewModeClicked() {
    this.setState(States.Viewing());
  }

  // This method jumps through a hoop to preserve some correctness about the type
  // information.  It's essentially performing a runtype check and then a cast that would appear
  // unsafe to Flow.  So this adds more specific type annotations on the output, so that flow
  // can enforce type constraints within the render methods for the different types of state.
  render() {
    var anyState: any = this.state;
    switch (anyState.mode) {
      case 'editing':
        var editingState: EditingState = anyState;
        return this.renderEditing(editingState);
      case 'viewing':
        var viewingState: ViewingState = anyState;
        return this.renderViewing(viewingState);
      default: throw new Error('invalid state' + anyState.mode);
    }
  }

  renderNavigation() {
    return dom.div({ style: styles.navigationFrame }, [
      dom.span({
        key: 'title',
        style: styles.navigationTitle
      }, 'Flow example'),
      dom.button({
        key: 'edit',
        onClick: this.onEditModeClicked.bind(this)
      }, 'Edit'),
      dom.button({
        key: 'view',
        onClick: this.onViewModeClicked.bind(this)
      }, 'View'),
    ]);
  }

  renderViewing(viewingState: ViewingState) {
    return dom.div({ style: styles.viewingPage },
      this.renderNavigation(),
      dom.div({ style: styles.padded }, 'hello, we are viewing the page!')
    );
  }

  renderEditing(editingState: EditingState) {
    return dom.div({ style: styles.editingPage },
      this.renderNavigation(),
      dom.div({ style: styles.padded }, 'hello, we are editing the page!'),
      dom.div({ style: styles.padded }, 'and the articleId is: ' + editingState.articleId)
    );
  }
}

module.exports = AppComponent;