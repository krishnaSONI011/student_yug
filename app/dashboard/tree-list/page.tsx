'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaTree,
  FaSeedling,
  FaSun,
  FaTint,
  FaLeaf,
  FaTimes,
  FaCheckCircle,
  FaInfoCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaWind,
  FaThermometerHalf
} from 'react-icons/fa';

interface Tree {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  plantingGuide: {
    bestSeason: string;
    soilType: string;
    sunlight: string;
    waterNeeds: string;
    spacing: string;
    steps: string[];
    careTips: string[];
    growthTime: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
  };
  environmentalImpact: {
    co2Absorption: string;
    oxygenProduction: string;
    shadeArea: string;
    soilImprovement: string;
  };
  image: string;
  icon: string;
}


interface tree2 {
  name_en: string;
  name_hi: string;
  name_sc: string;
  category: string;
  carbon: string;
  oxygen: string;
  status: string;
  description : string ;
  benefits: string[];
  img: string;

}

export default function TreeListPage() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState<tree2[]>([]);
  const [loading, setLoading] = useState(true);


  // Available trees that students can choose to plant
  const availableTrees: Tree[] = [
    {
      id: 1,
      name: 'Neem Tree',
      scientificName: 'Azadirachta indica',
      description: 'A fast-growing evergreen tree native to India. Known for its medicinal properties and natural pesticide qualities.',
      benefits: [
        'Natural air purifier',
        'Medicinal properties',
        'Natural pesticide',
        'Drought resistant',
        'Provides shade quickly'
      ],
      plantingGuide: {
        bestSeason: 'Monsoon (June-September)',
        soilType: 'Well-drained, sandy to loamy soil',
        sunlight: 'Full sunlight required',
        waterNeeds: 'Moderate - Water twice a week initially',
        spacing: '15-20 feet apart',
        steps: [
          'Choose a location with full sunlight and good drainage',
          'Dig a hole 2-3 feet deep and wide',
          'Mix organic compost with soil (1:1 ratio)',
          'Place the sapling in the hole, ensuring roots are spread',
          'Fill the hole with soil mixture, leaving 2 inches above ground',
          'Create a small water basin around the tree',
          'Water thoroughly after planting',
          'Add mulch around the base (3-4 inches away from trunk)',
          'Stake the tree if needed for support'
        ],
        careTips: [
          'Water deeply but infrequently to encourage root growth',
          'Remove weeds regularly around the tree',
          'Apply organic fertilizer every 3-4 months',
          'Prune dead branches during winter',
          'Protect from strong winds during initial years'
        ],
        growthTime: '2-3 years to reach 10-15 feet',
        difficulty: 'Easy'
      },
      environmentalImpact: {
        co2Absorption: '22 kg per year',
        oxygenProduction: '18 kg per year',
        shadeArea: 'Large canopy (up to 50 feet spread)',
        soilImprovement: 'Improves soil fertility with fallen leaves'
      },
      image: '/tree1.jpg',
      icon: '🌿'
    },
    {
      id: 2,
      name: 'Peepal Tree',
      scientificName: 'Ficus religiosa',
      description: 'A sacred tree in Indian culture, known for its large size, heart-shaped leaves, and excellent air purification properties.',
      benefits: [
        'Excellent air purifier',
        'Sacred and cultural significance',
        'Long lifespan (hundreds of years)',
        'Large shade provider',
        'Attracts birds and wildlife'
      ],
      plantingGuide: {
        bestSeason: 'Monsoon (July-August)',
        soilType: 'Well-drained, fertile soil',
        sunlight: 'Full to partial sunlight',
        waterNeeds: 'Regular watering until established',
        spacing: '30-40 feet apart (grows very large)',
        steps: [
          'Select a spacious location (tree grows very large)',
          'Dig a hole 3-4 feet deep and wide',
          'Mix garden soil with compost and sand',
          'Plant the sapling, ensuring the root ball is level with ground',
          'Support with stakes on 2-3 sides',
          'Water immediately and create a water basin',
          'Apply organic mulch around the base',
          'Protect with a tree guard initially'
        ],
        careTips: [
          'Water 2-3 times a week for first year',
          'Reduce watering after establishment',
          'Apply organic manure every 6 months',
          'Remove lower branches as tree grows',
          'Provide structural support if needed'
        ],
        growthTime: '3-5 years to reach significant height',
        difficulty: 'Medium'
      },
      environmentalImpact: {
        co2Absorption: '35 kg per year',
        oxygenProduction: '28 kg per year',
        shadeArea: 'Very large (up to 100 feet spread)',
        soilImprovement: 'Excellent - deep root system improves soil structure'
      },
      image: '/tree2.jpg',
      icon: '🌳'
    },
    {
      id: 3,
      name: 'Mango Tree',
      scientificName: 'Mangifera indica',
      description: 'India\'s national fruit tree. Grows into a large, beautiful tree that provides delicious fruits and excellent shade.',
      benefits: [
        'Produces delicious fruits',
        'High commercial value',
        'Excellent shade tree',
        'Attractive flowers',
        'Durable and long-lasting'
      ],
      plantingGuide: {
        bestSeason: 'Monsoon (July-September)',
        soilType: 'Deep, well-drained loamy soil',
        sunlight: 'Full sunlight (6-8 hours daily)',
        waterNeeds: 'Regular watering, especially during fruiting',
        spacing: '25-30 feet apart',
        steps: [
          'Choose a location with deep soil and good drainage',
          'Dig a pit 3x3x3 feet',
          'Mix topsoil with farmyard manure and bone meal',
          'Plant grafted sapling (for better fruits)',
          'Ensure graft union is above soil level',
          'Water immediately and create a basin',
          'Install tree guard for protection',
          'Stake the tree properly'
        ],
        careTips: [
          'Water regularly during first 2 years',
          'Apply NPK fertilizer during growing season',
          'Prune for shape and fruit production',
          'Protect from pests and diseases',
          'Harvest fruits when ripe (varies by variety)'
        ],
        growthTime: '3-4 years to start fruiting',
        difficulty: 'Medium'
      },
      environmentalImpact: {
        co2Absorption: '30 kg per year',
        oxygenProduction: '24 kg per year',
        shadeArea: 'Large (up to 60 feet spread)',
        soilImprovement: 'Good - organic matter from fallen leaves'
      },
      image: '/tree3.jpg',
      icon: '🥭'
    },
    {
      id: 4,
      name: 'Banyan Tree',
      scientificName: 'Ficus benghalensis',
      description: 'A majestic tree that grows into a giant with aerial roots. Provides enormous shade and is a keystone species for ecosystems.',
      benefits: [
        'Massive shade provider',
        'Ecosystem support',
        'Long lifespan',
        'Aesthetic beauty',
        'Cultural significance'
      ],
      plantingGuide: {
        bestSeason: 'Early Monsoon (June-July)',
        soilType: 'Well-drained, fertile soil',
        sunlight: 'Full sunlight preferred',
        waterNeeds: 'Regular watering during establishment',
        spacing: '50+ feet apart (grows extremely large)',
        steps: [
          'Select a very spacious location (needs extensive space)',
          'Dig a large pit 4x4x4 feet',
          'Use rich soil mixed with organic compost',
          'Plant sapling ensuring good root spread',
          'Provide strong support system',
          'Create large water basin',
          'Apply thick mulch layer',
          'Install protective barrier'
        ],
        careTips: [
          'Water deeply 2-3 times weekly initially',
          'Allow aerial roots to develop naturally',
          'Prune only for safety and structure',
          'Apply organic fertilizer annually',
          'Ensure adequate space for growth'
        ],
        growthTime: '5-7 years for substantial growth',
        difficulty: 'Hard'
      },
      environmentalImpact: {
        co2Absorption: '50+ kg per year',
        oxygenProduction: '40+ kg per year',
        shadeArea: 'Enormous (can cover acres)',
        soilImprovement: 'Excellent - creates rich micro-ecosystem'
      },
      image: '/tree4.jpg',
      icon: '🌴'
    },
    {
      id: 5,
      name: 'Jamun Tree',
      scientificName: 'Syzygium cumini',
      description: 'A fast-growing fruit tree with medicinal properties. Produces purple fruits and is excellent for reforestation.',
      benefits: [
        'Medicinal fruits',
        'Fast growth',
        'Bird attractant',
        'Drought tolerant',
        'Good for reforestation'
      ],
      plantingGuide: {
        bestSeason: 'Monsoon (July-September)',
        soilType: 'Well-drained, loamy to clayey soil',
        sunlight: 'Full to partial sunlight',
        waterNeeds: 'Moderate - Water 2-3 times a week initially',
        spacing: '20-25 feet apart',
        steps: [
          'Choose location with good drainage',
          'Dig pit 2.5x2.5x2.5 feet',
          'Mix soil with compost and organic manure',
          'Plant sapling carefully',
          'Water immediately after planting',
          'Create water retention basin',
          'Add organic mulch',
          'Support with stakes if needed'
        ],
        careTips: [
          'Water regularly for first year',
          'Apply organic fertilizer during monsoon',
          'Prune to maintain shape',
          'Protect young fruits from birds if needed',
          'Harvest when fruits turn dark purple'
        ],
        growthTime: '2-3 years to start fruiting',
        difficulty: 'Easy'
      },
      environmentalImpact: {
        co2Absorption: '18 kg per year',
        oxygenProduction: '15 kg per year',
        shadeArea: 'Medium to large',
        soilImprovement: 'Good soil improvement properties'
      },
      image: '/tree5.jpg',
      icon: '🫐'
    },
    {
      id: 6,
      name: 'Guava Tree',
      scientificName: 'Psidium guajava',
      description: 'A small to medium-sized fruit tree that is easy to grow and produces vitamin-rich fruits throughout the year.',
      benefits: [
        'Year-round fruiting',
        'High vitamin C content',
        'Easy to grow',
        'Compact size',
        'Fast fruiting'
      ],
      plantingGuide: {
        bestSeason: 'Monsoon or Early Winter',
        soilType: 'Well-drained, loamy soil',
        sunlight: 'Full sunlight (6+ hours)',
        waterNeeds: 'Regular watering, especially in summer',
        spacing: '15-20 feet apart',
        steps: [
          'Select sunny location with good drainage',
          'Dig pit 2x2x2 feet',
          'Mix garden soil with compost and sand',
          'Plant sapling (preferably grafted variety)',
          'Water thoroughly after planting',
          'Create water basin',
          'Apply mulch around base',
          'Install tree guard'
        ],
        careTips: [
          'Water 2-3 times a week during hot months',
          'Apply balanced fertilizer every 3 months',
          'Prune after fruiting season',
          'Thin fruits for better quality',
          'Protect from fruit flies'
        ],
        growthTime: '1-2 years to start fruiting',
        difficulty: 'Easy'
      },
      environmentalImpact: {
        co2Absorption: '15 kg per year',
        oxygenProduction: '12 kg per year',
        shadeArea: 'Medium',
        soilImprovement: 'Moderate soil improvement'
      },
      image: '/tree6.jpg',
      icon: '🍈'
    }
  ];

  const filteredTrees = availableTrees.filter(tree =>
    tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tree.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  useEffect(() => {
    const fetchTrees = async () => {
      try {

        const response = await axios.get("https://irisinformatics.net/studentyug/wb/get_all_trees");


        if (response.data.status === "1") {
          setTrees(response.data.data);   // all trees
        } else {
          console.error("Error fetching trees:", response.data.message);
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#204b73] rounded-full flex items-center justify-center">
              <FaTree className="text-2xl text-white" />
            </div>
            <div className='cursor-default'>
              <h1 className="text-3xl font-bold text-gray-900">Tree List</h1>
              <p className="text-gray-600">Choose a tree to plant and follow our planting guide</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md">
            <div className="relative">
              <FaTree className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search trees by name or scientific name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c756b] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Trees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree, index) => (
            <div
              key={index}
              className="bg-white cursor-default rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300  transform hover:-translate-y-1"

            >
              {/* Tree Icon/Image */}
              {/* <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                <span className="text-8xl">{tree.img}</span>
                <div className="absolute top-4 right-4">
                 
                </div>
              </div> */}
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <Image
                  src={`https://irisinformatics.net/studentyug/${tree.img}`}
                  alt={tree.img}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Tree Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tree.name_en}({tree.name_hi})</h3>
                <p className="text-sm text-gray-600 font-semibold italic mb-3"><span className='font-bold'>Scientific Name :</span> {tree.name_sc} </p>
                <p className="text-gray-700 font-semibold text-sm mb-4 text-justify">{tree.description}</p>

                {/* Key Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <ul className="flex flex-col gap-2">
  {tree.benefits.map((ben, index) => (
    <li key={index} className="flex font-semibold items-start gap-2 text-sm text-gray-700">
      <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
      <span>{ben}</span>
    </li>
  ))}
</ul>

                </div>

                {/* Quick Info */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                 
                  
                </div>

                {/* Environmental Impact Preview */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 font-semibold">CO₂<br/> Reduced(kg/year)</p>
                    <p className="text-sm font-semibold text-gray-900">{tree.carbon}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 font-semibold">O₂ <br/>Produced(kg/year)</p>
                    <p className="text-sm font-semibold text-gray-900">{tree.oxygen}</p>
                  </div>
                </div>

                {/* View Details Button */}
                {/* <button className="w-full py-2 px-4 bg-[#1c756b] text-white rounded-lg hover:bg-[#155e56] transition-colors duration-200 font-medium">
                  View Details & Planting Guide
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {filteredTrees.length === 0 && (
          <div className="text-center py-12">
            <FaTree className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No trees found matching your search.</p>
          </div>
        )}

        {/* Tree Detail Modal */}
        {selectedTree && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedTree.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTree.name}</h2>
                    <p className="text-gray-600 font-bold italic">scientific name:{selectedTree.scientificName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTree(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Tree</h3>
                  <p className="text-gray-700">{selectedTree.description}</p>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <ul className="space-y-2">
  {selectedTree.benefits.map((benefit, idx) => (
    <li key={idx} className="flex items-start gap-2">
      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
      <span className="text-gray-700">{benefit}</span>
    </li>
  ))}
</ul>

                  </div>
                </div>

                {/* Planting Requirements */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaInfoCircle className="text-blue-600" />
                    Planting Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <FaCalendarAlt className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Best Season</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.bestSeason}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Soil Type</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.soilType}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaSun className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Sunlight</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.sunlight}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaTint className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Water Needs</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.waterNeeds}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaTree className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Spacing</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.spacing}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FaSeedling className="text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Growth Time</p>
                        <p className="text-gray-700">{selectedTree.plantingGuide.growthTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Planting Guide */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaSeedling className="text-green-600" />
                    Step-by-Step Planting Guide
                  </h3>
                  <div className="space-y-4">
                    {selectedTree.plantingGuide.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-[#1c756b] text-white rounded-full flex items-center justify-center font-semibold">
                          {idx + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Care Tips */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaLeaf className="text-green-600" />
                    Care Tips
                  </h3>
                  <ul className="space-y-2">
                    {selectedTree.plantingGuide.careTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Environmental Impact */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaWind className="text-purple-600" />
                    Environmental Impact
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <FaThermometerHalf className="text-purple-600 text-2xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">CO₂ Absorption</p>
                      <p className="text-lg font-bold text-gray-900">{selectedTree.environmentalImpact.co2Absorption}</p>
                    </div>
                    <div className="text-center">
                      <FaWind className="text-purple-600 text-2xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Oxygen Production</p>
                      <p className="text-lg font-bold text-gray-900">{selectedTree.environmentalImpact.oxygenProduction}</p>
                    </div>
                    <div className="text-center">
                      <FaTree className="text-purple-600 text-2xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Shade Area</p>
                      <p className="text-lg font-bold text-gray-900">{selectedTree.environmentalImpact.shadeArea}</p>
                    </div>
                    <div className="text-center">
                      <FaLeaf className="text-purple-600 text-2xl mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Soil Improvement</p>
                      <p className="text-lg font-bold text-gray-900">{selectedTree.environmentalImpact.soilImprovement}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button className="flex-1 py-3 px-6 bg-[#1c756b] text-white rounded-lg hover:bg-[#155e56] transition-colors duration-200 font-semibold">
                    Plant This Tree
                  </button>
                  <button
                    onClick={() => setSelectedTree(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

