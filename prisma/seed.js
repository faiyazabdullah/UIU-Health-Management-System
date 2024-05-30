import {PrismaClient} from '@prisma/client'
import faqData from '../src/lib/data.json' assert {type: "json"}

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`)
  for (const faq of faqData) {
    await prisma.faq.create({
      data: faq,
    });
  }
    console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
/*
export async function seedData(){
    try{
        console.log(`Start seeding ...`)
    for (const faq of faqData) {
      await prisma.faq.create({
        data: faq,
      });
    }
      console.log(`Seeding finished.`)
    }catch(e){
        console.error(e)
        process.exit(1)
    }
    
}
//seedData();

  const faqData = [
        {
            "question": "What should I do if I feel unwell or need medical assistance on campus?",
            "answer": "If you're feeling unwell or require medical assistance, you should contact our on-campus health services or visit the university's medical bay. We have healthcare professionals available to help you during regular business hours. In case of emergencies after hours, call [Campus Emergency Contact Number] or visit the nearest hospital"
        },
        {
            "question" : "How can I schedule an appointment?",
            "answer" : "You can schedule an appointment by calling our office during regular business hours or by using our online scheduling system. If you're a new patient, please call our office to schedule your first appointment."
        },
        {
            "question":"What services are provided by the health center?",
            "answer": "We primarily offer consultation services for mental health, offer prescriptions for common illnesses, and provide referrals to specialists. We also offer a variety of wellness services, including nutrition counseling if you ask for weight checking. We also have emergency services in case you get into an accident."
        },
        {
            "question":"What are the costs for the services?",
            "answer": "The costs for our services vary depending on the type of service you need. For normal visits, we do not charge students. For consultations, we charge BDT100"
        },
        {
            "question":"What are the hours of operation?",
            "answer": "Our office is open from 8:00 AM to 5:00 PM, Saturday through Wednesday. We are closed on weekends and holidays."
        }
    ]
    */