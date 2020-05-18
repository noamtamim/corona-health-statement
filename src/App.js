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
import html2canvas from 'html2canvas';
import is from 'is_js';

function handleSave() {
  if (is.safari()) {
    html2canvas(document.body).then((canvas) => {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'Statement.png';
      a.click();
    });
  } else {
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
}

class App extends PureComponent {
  constructor() {
    super();
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.signaturePad.instance.clear();
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

  renderSave() {
    return (
      <div className="columns" style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="column" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outline-dark" onClick={this.handleClear}>
            <X />
            {' '}
            נקה חתימה
          </Button>
          <Button variant="dark" onClick={() => handleSave()}>
            <Check />
            {' '}
            שמור כתמונה לשיתוף
          </Button>
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
              <div className="columns">
                <div className="column" style={{ display: 'flex', justifyContent: 'center' }}>
                  <h1 className="title" style={{ marginBottom: 20 }}>
                    <PencilSquare />
                    {' '}
                    הצהרת בריאות
                  </h1>
                </div>
              </div>
              <div>
                <Form>
                  <Form.Group as={Row} controlId="frmChildName">
                    <Col>
                      <Form.Label>שם התלמיד/ה</Form.Label>
                      <Form.Control type="text" placeholder="לדוגמא: פלוני אלמוני" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="frmChildID">
                    <Col>
                      <Form.Label>מס׳ תעודת זהות</Form.Label>
                      <Form.Control type="text" placeholder="לדוגמא: 301234567" />
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
                      <Form.Control type="text" placeholder="לדוגמא: אבא של פלוני" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="frmParentId">
                    <Col>
                      <Form.Label>מס׳ תעודת זהות</Form.Label>
                      <Form.Control type="text" placeholder="לדוגמא: 301234567" />
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
              {this.renderSignaturePad()}
              <div className="columns">
                <div className="column">
                  <span>* למעט שיעול או קושי בנשימה הנובע ממצב כרוני כגון אסטמה או אלרגיה אחרת</span>
                </div>
              </div>
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
