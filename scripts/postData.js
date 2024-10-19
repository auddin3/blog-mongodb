const { connectToDatabase, closeDatabase } = require('../scripts/database')
const Post = require('../models/post');
const Author = require('../models/author');

const getAuthors = async () => {
    try {
        const authors = await Author.find({});
        return authors; 
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

async function seedPosts(authors) {
    const PostData = [
        {
            title: 'AI Revolution in Healthcare',
            summary: 'Exploring the rapid advancements of artificial intelligence in the healthcare sector.',
            body: 'Artificial intelligence (AI) is rapidly transforming the healthcare industry in ways that were once unimaginable. From diagnosing diseases to streamlining administrative tasks, AI is revolutionizing the way medical professionals work and how patients receive care. AI-driven algorithms can now analyze complex medical data, such as imaging scans, with remarkable accuracy, often outperforming human radiologists in detecting conditions like cancer at early stages. This capability is particularly valuable in areas where medical expertise is scarce, enabling faster, more accurate diagnoses, and ultimately improving patient outcomes. \n\nThe integration of AI into healthcare is not just limited to diagnostics. Personalized medicine, where treatments are tailored to an individual’s genetic makeup, has seen significant progress thanks to AIs ability to analyze massive datasets. AI systems can predict how a patient will respond to different treatments, allowing for more effective and targeted therapies. Virtual health assistants, powered by natural language processing, are also helping patients manage chronic conditions, providing advice, reminders, and even monitoring symptoms, thereby reducing hospital visits and healthcare costs. \n\nAs AI continues to evolve, its potential applications in healthcare grow broader. Drug discovery, for example, is another area benefiting from AI\'s capabilities. By simulating how drugs interact with biological systems, AI can significantly speed up the process of bringing new treatments to market. The ethical implications of AI in healthcare, including data privacy and bias in decision-making algorithms, will need to be carefully managed, but the future holds great promise for a more efficient, personalized, and accessible healthcare system.',
            date: new Date('2024-09-15'),
            author: authors[0]
        },
        {
            title: 'Quantum Computing: The Next Frontier',
            summary: 'Understanding the rise of quantum computing and its potential to solve complex problems.',
            body: 'Quantum computing is poised to revolutionize industries by solving problems that are currently unsolvable with classical computers. Unlike traditional computers, which use binary bits, quantum computers use qubits that can exist in multiple states at once, thanks to the principles of superposition and entanglement. This allows quantum computers to perform vast computations simultaneously, exponentially increasing their processing power. One of the most exciting applications of quantum computing is in cryptography, where quantum algorithms have the potential to break existing encryption systems, prompting the need for quantum-safe cryptographic methods.\n\nIn addition to its impact on security, quantum computing could lead to major breakthroughs in fields like chemistry, physics, and material science. For example, simulating molecular interactions at the quantum level could help scientists develop new drugs or materials much more efficiently than current methods allow. Quantum computers could model complex molecular structures and predict chemical reactions that would otherwise take years of experimentation, potentially transforming industries like pharmaceuticals and energy. \n\nAlthough quantum computers are still in their infancy, with only a few prototypes existing, the progress made by companies like IBM, Google, and Microsoft is remarkable. As quantum technology matures, industries such as logistics, finance, and artificial intelligence will also benefit from its ability to solve optimization problems at an unprecedented scale. However, significant technical challenges remain, including maintaining qubit stability and error correction, but the race is on to unlock the full potential of quantum computing.',
            date: new Date('2024-08-01'),
            author: authors[1]
        },
        {
            title: '5G Rollout and Its Impact on Connectivity',
            summary: 'A look at how 5G technology is changing the landscape of mobile and internet connectivity.',
            body: 'The global rollout of 5G technology is reshaping the way we connect to the internet and each other. 5G offers significantly faster data speeds, lower latency, and the ability to connect a far greater number of devices at once compared to its predecessor, 4G. This new level of connectivity is a game-changer for various industries, including telecommunications, transportation, and healthcare. Autonomous vehicles, for example, rely on low-latency networks to communicate with each other and their surroundings in real-time, which 5G can provide. Similarly, in healthcare, remote surgeries and diagnostics powered by 5G are becoming a reality, allowing specialists to treat patients from across the globe.\n\nOne of the most exciting aspects of 5G is its potential to enable smart cities, where everything from traffic lights to public utilities can be connected and managed in real-time. With 5G, the vision of cities that can optimize energy use, reduce traffic congestion, and enhance public safety is becoming more attainable. As more 5G infrastructure is deployed, the proliferation of Internet of Things (IoT) devices will allow for unprecedented levels of automation and data collection, driving efficiencies in industries such as agriculture, manufacturing, and logistics. \n\nDespite these advancements, challenges remain. Rolling out 5G infrastructure is costly and time-consuming, and concerns over coverage gaps, especially in rural areas, need to be addressed. Additionally, there are lingering questions about the health effects of 5G networks, though current research suggests the technology is safe. Over the next few years, 5G is expected to revolutionize the way we interact with technology, providing the backbone for innovations we’ve only begun to imagine.',
            date: new Date('2024-07-20'),
            author: authors[2]
        },
        {
            title: 'Gene Splicing and the Future of Genetic Engineering',
            summary: 'An update on gene splicing technology and its revolutionary impact on medicine and agriculture.',
            body: 'Gene splicing, the process of altering an organism’s genetic code, is opening up a world of possibilities in both medicine and agriculture. With the advent of CRISPR-Cas9 and other gene-editing technologies, scientists now have the tools to edit genes with a level of precision that was previously unimaginable. This precision has huge implications for medicine, where gene editing could potentially cure genetic disorders like cystic fibrosis and sickle cell anemia by correcting the faulty genes responsible for these conditions. Clinical trials using gene therapy are already underway, and the results have been promising, suggesting a future where genetic diseases are eradicated at their source.\n\nIn agriculture, gene splicing is being used to create crops that are more resilient to environmental stressors, such as drought, pests, and disease. By introducing specific genes that enhance a plant’s resistance, researchers are creating crops that can thrive in adverse conditions, potentially addressing food security issues in regions impacted by climate change. These genetically modified organisms (GMOs) could play a critical role in feeding the growing global population. While some critics raise ethical concerns about GMOs and the long-term impacts of genetic modification, the potential benefits, particularly in increasing food production and reducing the need for harmful pesticides, are hard to ignore.\n\nHowever, gene splicing is not without controversy. The ethical implications of human gene editing, especially when it comes to germline modifications (which affect future generations), have sparked debates in the scientific community. Questions about “designer babies” and the potential misuse of gene-editing technologies highlight the need for strict regulations and oversight. Despite these challenges, gene splicing remains one of the most exciting frontiers in both medical and agricultural science, with the potential to transform how we approach disease and food production in the future.',
            date: new Date('2024-06-10'),
            author: authors[3]
        }
    ];       

    return Post.create(PostData);
}

async function addPosts() {
    try {
        await connectToDatabase();
        await Post.deleteMany({});
        
        const authors = await getAuthors();
        const seededPosts = await seedPosts(authors);
        console.log('Posts seeded successfully:', seededPosts);
    } catch (error) {
        console.error('Error seeding Posts:', error);
    } finally {
        await closeDatabase();
    }
}

addPosts();
