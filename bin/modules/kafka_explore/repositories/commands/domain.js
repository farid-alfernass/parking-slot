
const Command = require('./command');
const kafka = require('kafka-node');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');

const kafka_topic = 'example';
const kafka_server = 'localhost:2181';
class User {

  constructor(db) {
    this.command = new Command(db);
  }

  async producer(data) {

    let result = {
      err: null,
      data:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhMjJoYWRpIiwic3ViIjoiNWQ0M2ViMzEzOGYxYWIwNzM4MTNkNjdmIiwiaWF0IjoxNTY1ODM5MzM2LCJleHAiOjE1NjU4NDUzMzYsImF1ZCI6Ijk3YjMzMTkzLTQzZmYtNGU1OC05MTI0LWIzYTliOWY3MmMzNCIsImlzcyI6InRlbGtvbWRldiJ9.rMeBJpIbozzbpgv4bh28T0AQdeKofAgAPA_FlkXDOkUbYcJkqSIFVrpCBzxHFTXNWuBQTsgLs8HLv38cdepVDTxKBhKaivDdL5c-aWSj3b_ShD-FYOMbsSWrC7HNOEQgVpVb7DOPpd4jnMQY43blLSVYEksNUUgjC3eOAjuYPUXHVAfwkrEABr7JxX1PRMesu2MFHkui215dVTpKL9etc1RfhKvS1bTIxF7Mgh12Av0SSf85OH4wPTgZF4DPdCEse94FrPT_kwRINwljXEZerikT3195BJJ3lAh95qzZneQaU3xSwirUjh-85Xembm9tN_pBVzQ1W9QJrnbJC45d6npnxNU87jZ1_ptDtMpYAg2bTR5bvyoWwq6ApmcU9-To1BqSOt9VjEWM6ox193Maw_6cEXgyAzawhnnrW5utgh01NHDzUUsuABamroVQoTeY96HftxtlL0fBG3iD3CQnRrF9TlW1mZR0KIPLj5RlKamZ9oj23J35WXnwl0KYYlwmxYWXn4TuKgV1RM1oxxWyX5bn24856liFyEZUaevQLG8j1Kzk62-gVdDcUGozF2AXQX9sbDab1rOrFY59ZfqS_MOdKg9kf66DcdvbuDuUoakEBNPJDwdXtG65lqR0ooZeDzpACj_6a8vq42xecaNI71bsbB6y7b7-0Ushc4C4NME'
    };
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient(kafka_server);
    const producer = new Producer(client);
    const kafka_topic = 'explores';
    let payloads = [
      {
        topic: kafka_topic,
        messages: data.message
      }
    ];
    let i;
    producer.on('ready', async () => {
      for (i = 0; i < 10; i++) {
        let payloads = [
          {
            topic: kafka_topic,
            messages: `${data.message} + ${i}`
          }
        ];
        producer.send(payloads, (err, data) => {
          if (err) {
            // console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed');
          } else {
            // console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
          }
        });
      }
    });

    producer.on('error', (err) => {
      // console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
      return wrapper.data(result);
    });
    return wrapper.data(result);

  }

  async consumer() {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient(kafka_server);
    let consumer = new Consumer(
      client,
      [{ topic: 'explores', partition: 0,fromOffset:173 }],
      {
        autoCommit: true,
        autoCommitIntervalMs : 1000,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: false
      }
      ,
    );

    consumer.on('message', async (message) => {
      // console.log(
      //   'kafka-> ',
      //   message.value
      // );
      // console.log(
      //   'message-> ',
      //   message.offset
      // );
      // new kafka.autoCommit();
    });
    consumer.on('error', (err) => {
      // console.log('error', err);
    });
    return wrapper.data('berhasil');
  }
}

module.exports = User;
