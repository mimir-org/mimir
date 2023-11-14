using AutoMapper;
using Mb.Models.Application;
using Mb.Models.Client;
using Mb.Models.Data;
using Newtonsoft.Json;

namespace Mb.Core.Profiles;

public class BlockProfile : Profile
{
    public BlockProfile()
    {
        CreateMap<BlockRequest, Block>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))

            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
            .ForMember(dest => dest.BlockType, opt => opt.MapFrom(src => src.BlockType))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))

            .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.PositionTree)))
            .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.PositionBlock)))
           
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))

            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
            .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
            .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

        CreateMap<Block, BlockResponse>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
        
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
       
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
            .ForMember(dest => dest.BlockType, opt => opt.MapFrom(src => src.BlockType))
            .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))
    
            .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<PositionResponse>(src.PositionTree)))
            .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<PositionResponse>(src.PositionBlock)))
     
            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
            .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
            .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
            .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
      
        
            .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
            .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
            .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
            .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
            .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));

        CreateMap<Block, BlockRequest>()
           .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
     
           .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
  
           .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
           .ForMember(dest => dest.Aspect, opt => opt.MapFrom(src => src.Aspect))
           .ForMember(dest => dest.BlockType, opt => opt.MapFrom(src => src.BlockType))
           .ForMember(dest => dest.Project, opt => opt.MapFrom(src => src.Project))

           .ForMember(dest => dest.PositionTree, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<PositionRequest>(src.PositionTree)))
           .ForMember(dest => dest.PositionBlock, opt => opt.MapFrom(src => JsonConvert.DeserializeObject<PositionRequest>(src.PositionBlock)))
   
           .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
           .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
           .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
           .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
    
           .ForMember(dest => dest.IsLocked, opt => opt.MapFrom(src => src.IsLocked))
           .ForMember(dest => dest.IsLockedStatusBy, opt => opt.MapFrom(src => src.IsLockedStatusBy))
           .ForMember(dest => dest.IsLockedStatusDate, opt => opt.MapFrom(src => src.IsLockedStatusDate))
           .ForMember(dest => dest.Connectors, opt => opt.MapFrom(src => src.Connectors))
           .ForMember(dest => dest.Attributes, opt => opt.MapFrom(src => src.Attributes));
    }
}