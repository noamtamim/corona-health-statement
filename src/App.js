import React, { PureComponent } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import {
  CheckCircle, Check, X, PencilSquare,
} from 'react-bootstrap-icons';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import htmlToImage from 'html-to-image';
import is from 'is_js';
import * as qs from 'query-string';

class App extends PureComponent {

  componentDidMount() {
    if (is.safari()) {
      alert("התגלה דפדפן ספארי. אנא שלח את העמוד להדפסה ובחר באפשרות שמירה כ-PDF")
    }
  }

  handleSaveBeta() {
    const node = document.getElementById('toSave');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: '',
        source: node,
        type: 'png',
        width: node.offsetWidth,
        height: node.offsetHeight,
        quality: '100',
        zoom: '1',
      })
    };
    fetch('https://www.html2image.net/api/api.php', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
  }

  handleSave() {
    const node = document.getElementById('toSave');
    htmlToImage.toPng(node)
      .then((dataUrl) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'Statement.png';
        a.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  handleClear() {
    this.signaturePad.instance.clear();
  }

  renderTitle() {
    return (
      <div className="columns">
        <div className="column" style={{ display: 'flex', justifyContent: 'center' }}>
          <h1 className="title" style={{ marginBottom: 20 }}>
            <PencilSquare />
            {' '}
            הצהרת בריאות
          </h1>
        </div>
      </div>
    );
  }

  renderForm() {
    const query = qs.parse(window.location.search);
    return (
      <div>
        <Form>
          <Form.Group as={Row} controlId="frmChildName">
            <Col>
              <Form.Label>שם התלמיד/ה</Form.Label>
              <Form.Control type="text" placeholder="לדוגמא: פלוני אלמוני" value={query.childName} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="frmChildID">
            <Col>
              <Form.Label>מס׳ תעודת זהות</Form.Label>
              <Form.Control type="text" placeholder="לדוגמא: 301234567" value={query.childId} />
            </Col>
          </Form.Group>
          <Row>
            <Col>
              <span style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>אני (החתום מטה) מצהיר כי:</span>
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckCircle />
              {' '}
              מדדתי חום לילד/תי ונמצא כי חום גופו/ה מתחת ל-38 מעלות צלזיוס
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckCircle />
              {' '}
              ילד/תי לא משתעל/ת ואין לו/לה קשיים בנשימה*
            </Col>
          </Row>
          <Row>
            <Col>
              <CheckCircle />
              {' '}
              למיטב ידיעתי ילד/תי לא היה/הייתה במגע קרוב עם חולה קורונה בשבועיים האחרונים
            </Col>
          </Row>

          <Form.Group style={{ marginTop: 20 }} as={Row} controlId="frmParentName">
            <Col>
              <Form.Label>שם ההורה</Form.Label>
              <Form.Control type="text" placeholder="לדוגמא: אבא של פלוני" value={query.parentName} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="frmParentId">
            <Col>
              <Form.Label>מס׳ תעודת זהות</Form.Label>
              <Form.Control type="text" placeholder="לדוגמא: 301234567" value={query.parentId} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="frmDate">
            <Col>
              <Form.Label>תאריך</Form.Label>
              <Form.Control type="text" defaultValue={new Date().toLocaleDateString('he')} />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }

  renderSignaturePad() {
    return (
      <div className="columns">
        <div className="column">
          <Form.Group as={Row} controlId="frmDate">
            <Col>
              <Form.Label>חתימת ההורה</Form.Label>
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <SignaturePad
                      redrawOnResize
                      ref={(ref) => this.signaturePad = ref}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Form.Group>
        </div>
      </div>
    );
  }

  renderClarifications() {
    return (
      <div className="columns">
        <div className="column">
          <span>* למעט שיעול או קושי בנשימה הנובע ממצב כרוני כגון אסטמה או אלרגיה אחרת</span>
        </div>
      </div>
    );
  }

  renderSave() {
    return (
      <div className="columns" style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="column" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outline-dark" onClick={this.handleClear.bind(this)}>
            <X />
            {' '}
            נקה חתימה
          </Button>
          {!is.safari() ?
          <Button variant="dark" onClick={this.handleSave.bind(this)}>
            <Check />
            {' '}
            שמור כתמונה לשיתוף
          </Button>
          : null}
        </div>
      </div>
    );
  }

  render() {
    return (
      <DirectionProvider direction={DIRECTIONS.RTL}>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <section className="section">
            <div className="container" id="toSave">
              {this.renderTitle()}
              {this.renderForm()}
              {this.renderSignaturePad()}
              {this.renderClarifications()}
            </div>
            <div className="container">
              {this.renderSave()}
            </div>
          </section>
        </div>
      </DirectionProvider>
    );
  }
}

export default App;
