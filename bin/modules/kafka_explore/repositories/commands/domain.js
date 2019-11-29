
const Command = require('./command');
const kafka = require('kafka-node');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');
const kafka_server = 'kafka-tmoney-api-gateway.apps.playcourt.id:32444';
const logger = require('../../../../helpers/utils/logger');
class User {
  constructor(db) {
    this.command = new Command(db);
  }
  async producer(data) {
    const ctx = 'domain-kafka-producer';
    let result = {
      err: null,
      data:
        ''
    };
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient(kafka_server);
    const producer = new Producer(client);
    const kafka_topic = kafka_server;

    producer.on('ready', async () => {
      // for (let i = 0; i < 1; i++) {
      let payloads = [
        {
          topic: 'linkaja-order',
          messages: `${data.message}`
        }
      ];
      producer.send(payloads, (err, data) => {
        if (err) {
          console.log(ctx, `[kafka-producer ->    ${kafka_topic}   ]: `, 'broker update failed');
        } else {
          console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
        }
      });
      // }
    });

    producer.on('error', (err) => {
      console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
      return wrapper.data(result);
    });
    return wrapper.data(result);

  }

  // async offSet() {
  //   const client = new kafka.KafkaClient(kafka_server);
  //   console.log('offset');
  //   const offset = new kafka.Offset(client);
  //   offset.fetch([{ topic: kafka_server, partition: 0, time: -1 }], (err, data) => {
  //     const latestOffset = data['explore']['0'][0];
  //     console.log('Consumer current offset: ' + latestOffset);
  //   });
  // }

  async consumer() {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient(kafka_server);
    let consumer = new Consumer(
      client,
      [{ topic: 'linkaja-order', partition: 0 }],
      {
        autoCommit: true,
        autoCommitIntervalMs: 1000,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: 'utf8',
        fromOffset: true
      }
    );

    consumer.on('message', async (message) => {
      console.log(
        'kafka-> ',
        // message.value
        JSON.stringify(message.value)
      );
    });
    consumer.on('error', (err) => {
      console.log('error', err);
    });
    return wrapper.data('berhasil');
  }
}

module.exports = User;
