import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Section from '../../components/UI/Section';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const servicesIncluded = [
  'One-on-one consultation',
  'Drafting and legal review',
  'Legal Review',
  'Certified legal translation',
  'ADJD court fees and registration',
];

const Costs = () => {
  return (
    <Section className="bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-primary-900 font-bold mb-4">Transparent & All-Inclusive Services</h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Every package includes comprehensive services to ensure your Will is legally sound and properly registered.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                Scope of Services
              </h3>
              <p className="text-neutral-600">Included in every package</p>
            </div>

            <div className="space-y-4 mb-8">
              {servicesIncluded.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-primary-600" size={20} />
                  </div>
                  <p className="text-neutral-700 font-medium">{service}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-center pt-6 border-t border-primary-200"
            >
              <p className="text-neutral-600 mb-6">
                Ready to secure your legacy? Get started with a personalized consultation.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
};

export default Costs;
