using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // We want to map from an activity to another activity
            CreateMap<Activity, Activity>();
        }
    }
}